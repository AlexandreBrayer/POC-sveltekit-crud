<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/PostCard.svelte';
	import { GradientButton, Modal, Label, Select, Input, Textarea } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PostListOutputType } from '$api/post/GET';
	export let data: PageData;

	let postModalOpen = false;

	let postForm: HTMLFormElement;

	let userSelectData = data.users.map((user) => {
		return {
			value: String(user.id),
			name: user.name!
		};
	});
	const { form, errors, constraints, enhance } = superForm(data.form, {
		clearOnSubmit: 'errors-and-message',
		multipleSubmits: 'prevent'
	});

	async function reFetchPosts() {
		const posts: PostListOutputType = await fetch('/api/post').then((res) => res.json());
		data.posts = posts.posts;
	}
		
</script>

<div class="flex flex-wrap gap-2 justify-center">
	{#each data.posts as post}
		{#if post.author}
			<Card {post} user={post.author} on:deletePost={reFetchPosts} />
		{/if}
	{/each}
</div>

<Modal title="Ajouter un post" bind:open={postModalOpen} autoclose={false}>
	<form class="flex flex-col space-y-2" method="POST" action="?/createPost" bind:this={postForm}>
		<Label>
			Selectioner un utilisateur
			<Select
				name="authorId"
				class="mt-2"
				items={userSelectData}
				bind:value={$form.authorId}
				aria-invalid={$errors.authorId ? 'true' : undefined}
				{...$constraints.authorId}
				placeholder="Choisir un utilisateur"
			/>
		</Label>
		{#if $errors.authorId}<span class="invalid">{$errors.authorId}</span>{/if}
		<Label for="title" class="space-y-2">Titre</Label>
		<Input
			name="title"
			id="title"
			type="text"
			placeholder="Votre titre"
			size="md"
			bind:value={$form.title}
			aria-invalid={$errors.title ? 'true' : undefined}
			{...$constraints.title}
		/>
		{#if $errors.title}<span class="invalid">{$errors.title}</span>{/if}
		<Label for="content" class="mb-2">Contenu</Label>
		<Textarea
			id="content"
			placeholder="Votre contenu"
			rows="4"
			name="content"
			bind:value={$form.content}
			aria-invalid={$errors.content ? 'true' : undefined}
			{...$constraints.content}
		/>
		{#if $errors.content}<span class="invalid">{$errors.content}</span>{/if}
	</form>
	<svelte:fragment slot="footer">
		<GradientButton shadow color="purpleToPink" on:click={() => postForm.requestSubmit()}>
			Envoyer
		</GradientButton>
		<GradientButton shadow color="pinkToOrange">Annuler</GradientButton>
	</svelte:fragment>
</Modal>
<GradientButton
	on:click={() => (postModalOpen = true)}
	class="fixed bottom-10 right-10"
	shadow
	color="purpleToPink"
>
	Ajouter un post
</GradientButton>
