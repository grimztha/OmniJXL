<script lang="ts">
  import { onMount } from 'svelte';
  import {
    activeTabStore,
    itemsStore,
    legacyItemsStore,
  } from '../stores/queue';
  import {
    isMaximizedStore,
    minimizeWindow,
    toggleMaximizeWindow,
    closeWindow,
    checkMaximized,
  } from '../stores/window';
  import { Sparkles, History } from '@lucide/svelte';

  onMount(() => {
    checkMaximized();
  });

  function handleDblClick(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (target?.closest('button') || target?.closest('[data-no-drag]')) {
      return;
    }
    toggleMaximizeWindow();
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<header
  data-tauri-drag-region
  on:dblclick={handleDblClick}
  class="h-11 bg-surface-850/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between pl-3 pr-0 shrink-0 z-50 select-none gap-3 relative"
>
  <!-- Left App Identity -->
  <div
    data-tauri-drag-region
    class="flex items-center space-x-3 shrink-0 pointer-events-none"
  >
    <div class="flex items-center space-x-2.5">
      <img
        src="/app-icon.png"
        alt="OmniJXL Logo"
        class="w-6 h-6 rounded-md shadow-sm shadow-jxl-teal/20 object-contain ring-1 ring-white/10"
      />
      <span class="text-xs font-bold tracking-normal text-slate-100">
        OmniJXL
      </span>
    </div>
  </div>

  <!-- Center Tab Selector Navigation (Segmented Switcher) -->
  <div
    data-no-drag
    class="flex items-center bg-surface-900/90 p-0.5 rounded-xl border border-white/10 gap-0.5 text-xs font-medium shadow-inner shrink-0"
  >
    <button
      type="button"
      on:click={() => activeTabStore.set('encode')}
      class={`px-3 py-1 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer text-xs ${
        $activeTabStore === 'encode'
          ? 'bg-brand-600 text-white shadow-sm font-semibold border border-brand-400/30'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
      }`}
    >
      <Sparkles class={`w-3.5 h-3.5 ${$activeTabStore === 'encode' ? 'text-jxl-teal' : 'text-slate-400'}`} />
      <span>Encode to .JXL</span>
      {#if $itemsStore.length > 0}
        <span
          class={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-0.5 ${
            $activeTabStore === 'encode'
              ? 'bg-surface-950/80 text-teal-300 border border-teal-400/30'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {$itemsStore.length}
        </span>
      {/if}
    </button>

    <button
      type="button"
      on:click={() => activeTabStore.set('legacy')}
      class={`px-3 py-1 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer text-xs ${
        $activeTabStore === 'legacy'
          ? 'bg-brand-600 text-white shadow-sm font-semibold border border-brand-400/30'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
      }`}
    >
      <History class={`w-3.5 h-3.5 ${$activeTabStore === 'legacy' ? 'text-amber-400' : 'text-slate-400'}`} />
      <span>JXL to PNG / JPG</span>
      {#if $legacyItemsStore.length > 0}
        <span
          class={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-0.5 ${
            $activeTabStore === 'legacy'
              ? 'bg-surface-950/80 text-amber-300 border border-amber-400/30'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {$legacyItemsStore.length}
        </span>
      {/if}
    </button>
  </div>

  <!-- Right Tools & Window Chrome Controls -->
  <div class="flex items-center h-full shrink-0">
    <!-- Integrated Windows 11 App Controls -->
    <div data-no-drag class="flex items-center h-full">
      <button
        type="button"
        on:click={minimizeWindow}
        class="h-full w-11 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
        title="Minimize"
        aria-label="Minimize"
      >
        <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.1">
          <path d="M1 5.5h8" />
        </svg>
      </button>

      <button
        type="button"
        on:click={toggleMaximizeWindow}
        class="h-full w-11 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer"
        title={$isMaximizedStore ? 'Restore' : 'Maximize'}
        aria-label={$isMaximizedStore ? 'Restore' : 'Maximize'}
      >
        {#if $isMaximizedStore}
          <!-- Restore Glyph -->
          <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.1">
            <rect x="1.5" y="3.5" width="5" height="5" />
            <path d="M3.5 3.5V1.5h5v5H6.5" />
          </svg>
        {:else}
          <!-- Maximize Glyph -->
          <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.1">
            <rect x="1.5" y="1.5" width="7" height="7" />
          </svg>
        {/if}
      </button>

      <button
        type="button"
        on:click={closeWindow}
        class="h-full w-11 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 active:bg-rose-700 transition-colors cursor-pointer"
        title="Close"
        aria-label="Close"
      >
        <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
        </svg>
      </button>
    </div>
  </div>
</header>
