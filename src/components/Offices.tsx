import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Charlotte" invert={invert}>
          123 Aviation Way
          <br />
          Charlotte, NC 28208
        </Office>
      </li>
      <li>
        <Office name="Raleigh" invert={invert}>
          456 Flight Center Drive
          <br />
          Raleigh, NC 27623
        </Office>
      </li>
    </ul>
  )
}
