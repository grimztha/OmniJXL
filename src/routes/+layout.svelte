<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { isMaximizedStore, checkMaximized } from '$lib/stores/window';
  import ResizeHandles from '$lib/components/ResizeHandles.svelte';

  let { children } = $props();

  onMount(() => {
    checkMaximized();
    const handleResize = () => {
      checkMaximized();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div
  class="bg-surface-900 text-slate-100 font-sans antialiased h-screen w-screen overflow-hidden select-none flex flex-col relative {$isMaximizedStore
    ? 'rounded-none border-0'
    : 'rounded-[8px] border border-white/10 shadow-2xl'}"
>
  <ResizeHandles />
  {@render children()}
</div>
