export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[920px] flex-wrap justify-between gap-4 px-8 pt-6 pb-9 text-[11.5px] font-medium text-muted-foreground">
        <span>© {new Date().getFullYear()} Moohyun Song</span>
        <span>
          Distributed Data Processing Systems Lab, Hanyang University, Seoul, Republic of
          Korea
        </span>
      </div>
    </footer>
  )
}
