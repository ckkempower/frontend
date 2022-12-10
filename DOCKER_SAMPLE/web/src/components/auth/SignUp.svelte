<script lang="ts">
    import type { SignUpType } from 'src/shared/types';
    import { countries, states } from 'src/shared/constants';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { fly } from 'svelte/transition';
    import ChangePfp from './PfpInput.svelte';
    let formIsFinished = false;
    let stage = getContext<Writable<number>>('stage');

    let files: FileList;
    let formData: SignUpType = {
        email: '',
        userName: '',
        password: '',
        country: '',
        city: '',
        state: '',
        firstName: '',
        lastName: '',
        pfp: {
            file: '',
            extension: '',
        },
    };
    let errorMessage = '';
    const validateForm = () => {
        let isFilled = true;
        Object.keys(formData).forEach((key) => {
            if ((formData as any)[key] === '') {
                isFilled = false;
            }
        });

        return isFilled;
    };

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!formIsFinished) return;

        const response = await fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
            }),
        });
        const data = await response.json();
        if (data.message) {
            errorMessage = data.message;
        }
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
    };

    $: formData, (formIsFinished = validateForm());
    $: if ($stage == 1 && !formIsFinished) {
        stage.set(0);
    }
</script>

<form action="POST" class="sign-up" on:submit={handleSubmit}>
    <h2>Join the Conversation</h2>
    {#if $stage == 0}
        <div class="stage">
            <div class="section">
                <h3>Basic Info</h3>
                <div class="fieldset">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        bind:value={formData.email}
                    />
                    <div class="split">
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            required
                            bind:value={formData.firstName}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            required
                            bind:value={formData.lastName}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="User Name"
                        name="userName"
                        required
                        bind:value={formData.userName}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        bind:value={formData.password}
                    />
                </div>
            </div>
            <div class="section">
                <h3>Location</h3>
                <div class="fieldset">
                    <select
                        name="country"
                        required
                        bind:value={formData.country}
                    >
                        <option value="">Country</option>
                        {#each countries as country}
                            <option value={country}>{country}</option>
                        {/each}
                    </select>
                    <select name="state" required bind:value={formData.state}>
                        <option value="">State</option>
                        {#each states as state}
                            <option value={state}>{state}</option>
                        {/each}
                    </select>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        required
                        bind:value={formData.city}
                    />
                </div>
            </div>

            <button
                disabled={!formIsFinished}
                on:click={(e) => {
                    e.preventDefault();
                    $stage = 1;
                }}>Next</button
            >
        </div>
    {/if}
    {#if $stage == 1}
        <div class="stage" in:fly={{ x: 200, duration: 400 }}>
            <h3 class="center-text">Profile Picture</h3>
            <ChangePfp bind:pfp={formData.pfp} />
            {#if errorMessage}
                <div class="error">{errorMessage}</div>
            {/if}
            <button
                disabled={!formData.pfp.file || !formData.pfp.extension}
                type="submit">Sign Up</button
            >
        </div>
    {/if}
</form>

<style lang="scss">
    .sign-up {
        overflow: hidden;
        h2 {
            text-align: center;
        }

        .stage {
            display: flex;
            flex-direction: column;
            padding: 2em 4em;
            gap: 1em;
            max-width: min(500px, 100vw);
        }
        h3 {
            transition: all 0.2s ease-in-out;
        }
        .split {
            display: flex;
            gap: 1em;
            flex-wrap: wrap;
            input {
                flex: 1;
            }
        }
    }
    .error {
        color: var(--color-warning-dark);
        font-weight: bold;
    }
    .section:focus-within {
        h3 {
            color: var(--color-primary);
        }
    }
    .fieldset {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
</style>
