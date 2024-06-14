

const AppBadge = ({children,classname}) => {
  return (
    <div className={`bg-slate-200 dark:bg-slate-950  ${classname}`} >
      {children}
    </div>
  )
}

export default AppBadge

