<script lang="ts">
  import { isMaximizedStore, startResize } from '../stores/window';
  import type { ResizeDirection } from '../stores/window';

  function handleResize(direction: ResizeDirection, e: MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    startResize(direction);
  }
</script>

{#if !$isMaximizedStore}
  <!-- Edge resize hitboxes -->
  <div
    class="fixed top-0 left-2.5 right-2.5 h-1.5 cursor-n-resize z-[100] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('North', e)}
    role="separator"
    aria-hidden="true"
  ></div>
  <div
    class="fixed bottom-0 left-2.5 right-2.5 h-1.5 cursor-s-resize z-[100] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('South', e)}
    role="separator"
    aria-hidden="true"
  ></div>
  <div
    class="fixed top-2.5 bottom-2.5 left-0 w-1.5 cursor-w-resize z-[100] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('West', e)}
    role="separator"
    aria-hidden="true"
  ></div>
  <div
    class="fixed top-2.5 bottom-2.5 right-0 w-1.5 cursor-e-resize z-[100] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('East', e)}
    role="separator"
    aria-hidden="true"
  ></div>

  <!-- Corner resize hitboxes -->
  <div
    class="fixed top-0 left-0 w-3 h-3 cursor-nw-resize z-[101] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('NorthWest', e)}
    role="separator"
    aria-hidden="true"
  ></div>
  <div
    class="fixed top-0 right-0 w-3 h-3 cursor-ne-resize z-[101] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('NorthEast', e)}
    role="separator"
    aria-hidden="true"
  ></div>
  <div
    class="fixed bottom-0 left-0 w-3 h-3 cursor-sw-resize z-[101] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('SouthWest', e)}
    role="separator"
    aria-hidden="true"
  ></div>
  <div
    class="fixed bottom-0 right-0 w-3 h-3 cursor-se-resize z-[101] select-none pointer-events-auto"
    on:mousedown={(e) => handleResize('SouthEast', e)}
    role="separator"
    aria-hidden="true"
  ></div>
{/if}
