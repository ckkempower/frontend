import {
    BaseEntity,
    Column,
    Entity,
    FindOneOptions,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountType, SignUpType, WithPower } from '../shared/types';
import { Group } from './Group';
type AccountSanatizeFunction = (account: Partial<Account>) => AccountType;
@Entity()
export class Account extends BaseEntity implements AccountType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column({ nullable: true })
    county: string;

    @Column({ nullable: true })
    pfp: string;

    @Column({ default: 20 })
    power: number;

    @ManyToMany(() => Account)
    @JoinTable({
        name: 'follows',
    })
    followers: AccountType[];

    @Column({ default: 0 })
    followerCount: number;

    @ManyToOne(() => Group, (group) => group.members, {
        nullable: true,
        cascade: true,
    })
    group: Group;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    static async validateRegister(account: SignUpType): Promise<string | null> {
        if (!account.email) return 'Email is required';
        if (!account.password) return 'Password is required';
        if (!account.firstName) return 'First name is required';
        if (!account.lastName) return 'Last name is required';
        if (!account.userName) return 'User name is required';
        if (!account.country) return 'Country is required';
        if (!account.city) return 'City is required';
        if (!account.state) return 'State is required';
        if (!account.county) return 'County is required';
        if (!account.pfp.file || !account.pfp.extension)
            return 'PFP is required';
        if (
            await Account.findOne({
                where: { email: account.email },
            })
        )
            return 'Email is already in use';
        if (
            await Account.findOne({
                where: { userName: account.userName },
            })
        )
            return 'User name is already in use';

        return null;
    }

    static validateLogin(account: Account): string | null {
        if (!account.email) return 'Email is required';
        if (!account.password) return 'Password is required';
        return null;
    }

    static sanatizeMap(
        accounts: Partial<Account>[],
        sanatizeFunction: AccountSanatizeFunction
    ): AccountType[] {
        return accounts.map(sanatizeFunction);
    }

    static sanatize(account: Partial<Account>): AccountType {
        const copy = { ...account };
        delete copy.password;
        delete copy.isAdmin;
        delete copy.followers;
        return copy as AccountType;
    }

    static sanatizePublic(account: Partial<Account>): AccountType {
        const copy = Account.sanatize(account) as Partial<Account>;
        delete copy.email;
        delete copy.firstName;
        delete copy.lastName;
        return copy as AccountType;
    }

    static async getAccount(
        params: number | FindOneOptions<Account>,
        relations?: string[]
    ): Promise<Account> {
        const where = typeof params === 'number' ? { id: params } : params;
        const acc = await Account.findOne({
            relations,
            where,
        });
        if (!acc) throw new Error(`Account not found with id ${params}`);
        return acc as Account;
    }

    static async getWithFollowers(
        params: number | FindOneOptions<Account>
    ): Promise<Account> {
        const acc = await Account.getAccount(params, ['followers']);
        return acc as Account;
    }

    async addFollower(follower: Account) {
        if (this.isFollowing(follower)) return false;
        this.followers.push(follower);
        this.followerCount++;
        await this.save();
        return true;
    }

    async removeFollower(follower: Account) {
        if (!this.isFollowing(follower)) return false;
        this.followers = this.followers.filter((a) => a.id !== follower.id);
        this.followerCount = Math.min(this.followerCount - 1, 0);
        await this.save();
        return true;
    }

    isFollowing(follower: Account): boolean {
        if (!this.followers) this.followers = [];
        const result = this.followers.find((a) => a.id === follower.id);
        console.log(result);
        return !!result;
    }

    increasePower(amount: number) {
        this.power += amount * this.followers.length;
    }

    /**
     *
     * @param from Account to send the power from
     * @param amount Amount of power to send
     */
    async transferPower(
        from: number | (WithPower & BaseEntity),
        amount: number
    ) {
        const fromAccount =
            typeof from === 'number' ? await Account.getAccount(from) : from;
        if (fromAccount.power < amount) throw new Error('Not enough power!');
        fromAccount.power -= amount;
        this.power += amount;
        await fromAccount.save();
        await this.save();
    }

    static async massTransferPower() {
        const query = Account.createQueryBuilder('account');
        query.innerJoinAndSelect('account.followers', 'follower');
        //select all accounts that have followers
        const accounts = await query.getMany();
        for (const account of accounts) {
            if (account.followers.length === 0) continue;

            account.followers.forEach((follower) => {
                account
                    .transferPower(follower as Account, 0.1)
                    .catch(console.error);
            });
        }
    }
}