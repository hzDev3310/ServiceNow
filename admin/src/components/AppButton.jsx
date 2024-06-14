"use client"

const AppButton = ({children,classname,...otherProps}) => {
  return (
    <button className={`bg-primary p-2 rounded-full text-white w-full capitalize ${classname}`} {...otherProps} >
      {children}
    </button>
  )
}

export default AppButton
