import "./Cinput.css"

function CInput ({type, name, placeholder, design, emitFunction, errorCheck}) {

    return(
        <input 
            type={type}
            name={name}
            placeholder={placeholder}
            className={design}
            onChange={(e)=>emitFunction(e)}
        />
    )
}

export default CInput