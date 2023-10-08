

export default function Selector({name, options, onChange, id}) {
    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <select className="form-select" name={name} id={id} title={id} onChange={onChange} itemID={id}>
                <option value="all">全部</option>
                {options.map((option, index) => {
                    return <option key={index} value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}