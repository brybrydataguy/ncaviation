import { useId } from 'react'
import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
}) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        className={clsx(
          'h-8 transition-all duration-300',
          invert ? 'fill-white' : 'fill-neutral-950',
          filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
        )}
      />
      <use
        href={`#${id}-path`}
        className={invert ? 'stroke-white' : 'stroke-neutral-950'}
        fill="none"
        strokeWidth="1.5"
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M16 8 L24 16 L28 16 L28 20 L24 20 L16 28 L8 20 L4 20 L4 16 L8 16 L16 8 Z M16 12 L20 16 L12 16 L16 12 Z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 32"
      aria-hidden="true"
      className={clsx(fillOnHover && 'group/logo', className)}
      {...props}
    >
      <rect x="0" y="5" width="30" height="30" fill="black"/>
      <text x="15" y="25"
            font-family="Arial, sans-serif"
            font-size="16"
            font-weight="bold"
            text-anchor="middle"
            fill="white">NC</text>
            
      <text x="65" y="25"
            font-family="Arial, sans-serif"
            font-size="16"
            font-weight="bold"
            text-anchor="middle"
            fill="black">Aviation</text>
    </svg>
  )
}
