

export default function Selector({name, options, onChange, ref}) {
    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <select className="form-select" name={name} id={name} onChange={onChange} ref={ref}>
                <option value="all">全部</option>
                {options.map((option, index) => {
                    return <option key={index} value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}