import React, {useId} from 'react'
import { Controller } from 'react-hook-form'

function Input({
    type,
    control,
    name,
    label,
    placeholder,
    className = "",
    pattern,
    ...props
}) {

    const id = useId;
  return (

            <Controller
            control={control}
            name= {name? name : "url"}
            render={({ field: {onChange, value = ""}, fieldState }) => (

                <input 
                type={type}
                className={`border border-gray-400 w-1/2 h-10 rounded-lg px-4 ${className}`}
                value={value}
                {...props} 
                onChange={onChange}/>
            )}
            rules={{ required: true,  pattern: pattern || null}}
            
            />
  )
}

export default Input