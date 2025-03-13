export type IndicatorProps = {
    value: number
}

export function Indicator( props: IndicatorProps) {
    const { value } = props
    return (
        <span className="text-lg font-medium">
            {value}
            <sup className="text-xs ml-0.5">units</sup>
        </span>
    )
}