export default function TextHeader({ text, className }: { text: string, className?: string }) {
    return (
        <h2 className={`font-extrabold text-[var(--text-primary)] ${className}`}>
            {text}
        </h2>
    )
}
