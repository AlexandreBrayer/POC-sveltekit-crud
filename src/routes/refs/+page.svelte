<script lanf="ts">
	import { Accordion, Heading, A } from 'flowbite-svelte';
	import LibDescription from '$lib/components/LibDescription.svelte';
</script>

<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
	Libs & Refs
</Heading>
<Accordion>
	<LibDescription
		header="Svelte et UI"
		libs={[
			{
				name: 'Sveltekit',
				url: 'https://kit.svelte.dev/',
				description: 'Comme framework principal'
			},
			{
				name: 'Svelte',
				url: 'https://svelte.dev/',
				description: 'Comme ui framework'
			},
			{
				name: 'Svelte-api',
				url: 'https://github.com/JacobLinCool/sveltekit-api',
				description:
					'Pour la gestion des routes api, validation des données entrantes et sortantes, génération de types et de swagger'
			},
			{
				name: 'Flowbite-svelte',
				url: 'https://flowbite-svelte.com/',
				description: 'Pour les composants ui et le css'
			},
			{
				name: 'Flowbite-svelte-icons',
				url: 'https://flowbite-svelte.com/icons',
				description: 'Pour les icons'
			},
			{
				name: 'Tailwindcss',
				url: 'https://tailwindcss.com/',
				description: 'Bonne intégration avec flowbite'
			}
		]}
	/>
	<LibDescription
		header="Validation"
		libs={[
			{
				name: 'Zod',
				url: 'https://zod.dev/',
				description: 'Pour définir des schémas de validation'
			},
			{
				name: 'Superforms',
				url: 'https://superforms.rocks/',
				description: 'Pour la gestion des formulaires typesafe et la validation'
			}
		]}
	/>
	<LibDescription
		header="Database et ORM"
		libs={[
			{
				name: 'PostgreSQL',
				url: 'https://www.postgresql.org/',
				description: "Parce que c'est cool les élephants"
			},
			{
				name: 'Prisma',
				url: 'https://www.prisma.io/',
				description:
					'Un bon orm qui génère des types, migrations, et un client pour accéder à la db facilement'
			}
		]}
	/>
</Accordion>
