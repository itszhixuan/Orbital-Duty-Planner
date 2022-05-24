import { useState } from "react";

function Navbar (props) {
    const [items, setItem] = useState("6");

    function handleSubmit(event) {
        event.preventDefault();
        alert(items);
    }

    return (
        <h2> 
            <tr> 5</tr>
            <tr> 4</tr>
            <form onSubmit={handleSubmit}>
                <label> Enter something haha
                    <input 
                      type = "text"
                      name = "hi"
                      value = {items}
                      onChange = {(x) => setItem(x.target.value)}
                      />
                </label>
                <input type = "submit" value = "press"/>
            </form>
        </h2>
    );
}
export default Navbar;