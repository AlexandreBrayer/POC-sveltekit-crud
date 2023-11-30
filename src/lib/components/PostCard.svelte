<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { CloseSolid } from 'flowbite-svelte-icons';
	import UserCard from './UserCard.svelte';
	import type { Post, User } from '@prisma/client';
	import moment from 'moment';
	const dispatch = createEventDispatcher();

	function deletePost() {
		fetch(`/api/post/${post.id}`, {
			method: 'DELETE'
		}).then(() => {
			dispatch('deletePost');
		});
	}

	export let post: Post;
	export let user: User;
</script>

<Card class="w-[300px] relative">
	<CloseSolid on:click={deletePost} size="sm" class="absolute top-2 right-2 cursor-pointer"></CloseSolid>
	<p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{post.title}
	</p>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
		{post.content ?? 'No content provided.'}
	</p>
	<UserCard {user}></UserCard>
	<!-- add a p with the date of creation formated with moment -->
	<p class="text-sm pt-2 text-gray-500 truncate dark:text-gray-400">
		{moment(post.createdAt).format('DD/MM/YYYY HH:mm')}
	</p>
</Card>
