<script lang="ts">
  import { classNames } from '$lib/utils/classNames';
  import type { Snippet } from 'svelte';
  import type { Icon as IconType } from 'lucide-svelte';
  import { melt, type AnyMeltElement, emptyMeltElement } from '@melt-ui/svelte';

  export const style = {
    base: 'peer/button rounded-lg select-none disabled:opacity-40 disabled:pointer-events-none focus-visible ring-inset',
    iconOnly: 'block p-3 sm:p-2',
    fullWidth: 'min-w-0 w-full',
    withText: 'flex items-center gap-3 p-3 sm:py-2',
  } as const;

  export const colours = {
    base: 'text-dark dark:text-light hover:bg-gray-300 dark:hover:bg-neutral-700',
    inverted: 'text-light dark:text-dark hover:bg-neutral-700 dark:hover:bg-gray-300',
    primary: 'text-light bg-primary hover:bg-[#304730]',
  } as const;
  export const coloursActive = {
    ...colours,
    base: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700/60 dark:hover:bg-neutral-700',
  } as const;

  type BaseProps = {
    active?: boolean,
    children: Snippet,
    className?: string,
    colour?: keyof typeof colours;
    colourActive?: keyof typeof coloursActive;
    fullWidth?: boolean,
    icon?: typeof IconType;
    iconClassName?: string,
    iconOnly?: boolean,
    secondaryAction?: Snippet,
    element?: AnyMeltElement,
  };

  type ButtonOptions = BaseProps & {
    disabled?: boolean,
    href?: never,
    onclick?: (event: MouseEvent) => void
    target?: never,
    type?: 'button' | 'submit'
  };

  type LinkOptions = BaseProps & {
    disabled?: never,
    href: string, // TODO: Make this typesafe
    onclick?: never,
    target?: '_self' | '_blank',
    type?: never,
  };

  type ButtonProps = ButtonOptions | LinkOptions;

  let {
    active,
    children,
    className,
    colour = 'base',
    colourActive = 'base',
    disabled,
    element = emptyMeltElement as AnyMeltElement,
    fullWidth = true,
    href,
    icon: Icon,
    iconClassName,
    iconOnly,
    onclick,
    // secondaryAction,
    target = '_self',
    type = 'button',
    ...props
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    class={classNames(
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colourActive] : colours[colour],
      style.base,
      className,
    )}
    rel={target === '_blank' ? 'noreferrer' : undefined}
    {target}
    {href}
    {...props}
  >
    {#if Icon}
      <Icon class={classNames('size-6 flex-shrink-0', iconClassName)} aria-hidden="true" />
    {/if}

    <span
      class={classNames(
        iconOnly ? '' : 'truncate',
        iconOnly && Icon ? 'sr-only' : '',
      )}
    >
      {@render children()}
    </span>

    <!-- {secondaryAction && (
      <div class="ml-auto flex gap-2">
        {secondaryAction}
      </div>
    )} -->
  </a>
{:else}
  <button
    class={classNames(
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colourActive] : colours[colour],
      style.base,
      className,
    )}
    {disabled}
    {onclick}
    {type}
    {...props}
    use:melt={$element}
  >
    {#if Icon}
      <Icon class={classNames('size-6 flex-shrink-0', iconClassName)} aria-hidden="true" />
    {/if}

    <span
      class={classNames(
        iconOnly ? '' : 'truncate',
        iconOnly && Icon ? 'sr-only' : '',
      )}
    >
      {@render children()}
    </span>

    <!-- {secondaryAction && (
      <div className="ml-auto flex gap-2">
        {secondaryAction}
      </div>
    )} -->
  </button>
{/if}
