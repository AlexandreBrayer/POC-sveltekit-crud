<script lang="ts">
	import { AccordionItem, A } from 'flowbite-svelte';
	export let libs: { name: string; url: string; description: string }[];
	export let header: string;
</script>

<AccordionItem>
	<span slot="header">{header}</span>
	{#each libs as lib}
		<p class="mb-2 text-gray-500 dark:text-gray-400">
			<A href={lib.url} class="font-medium hover:underline">{lib.name}</A>
			{lib.description}
		</p>
	{/each}
</AccordionItem>
