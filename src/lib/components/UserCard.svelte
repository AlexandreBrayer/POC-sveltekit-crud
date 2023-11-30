<script lang="ts">
	import type { User } from '@prisma/client';
	import { Avatar } from 'flowbite-svelte';
	export let user: User;
</script>

<div class="flex items-center space-x-4">
	<Avatar
		src="https://api.dicebear.com/7.x/thumbs/svg?seed={user.name}"
		alt="https://api.dicebear.com/7.x/thumbs/svg?seed={user.name}"
		class="flex-shrink-0"
	/>
	<div class="flex-1 min-w-0">
		<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
			{user.name}
		</p>
		<p class="text-sm text-gray-500 truncate dark:text-gray-400">
			{user.email}
		</p>
	</div>
</div>
