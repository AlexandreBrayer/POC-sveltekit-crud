<script>
	import '../app.pcss';
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
  import { GithubSolid } from 'flowbite-svelte-icons';
</script>

<div class="bg-gray-900 min-h-screen">
	<Navbar>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Poc Sveltekit CRUD API</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl>
			<NavLi href="/docs">Docs</NavLi>
      <NavLi href="https://github.com/AlexandreBrayer/POC-sveltekit-crud"><GithubSolid/></NavLi>
      <NavLi href="/refs">Lib & Refs</NavLi>
		</NavUl>
	</Navbar>
  <div class="w-3/5 mx-auto">
		<slot />
	</div>
</div>
