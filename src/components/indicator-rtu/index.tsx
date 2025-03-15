export type IndicatorProps = {
    value: number
    indicatorName: string
}

export function Indicator( props: IndicatorProps) {
    const { value, indicatorName } = props
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-medium">
                {value}
                <sup className="text-xs ml-0.5">units</sup>
            </span>
            <span>{indicatorName}</span>
        </div>
    )
}