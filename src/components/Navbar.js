import { useState } from "react";

function Navbar (props) {
    const [items, setItem] = useState("6");

    function handleSubmit(event) {
        event.preventDefault();
        alert(items);
    }

   
}
export default Navbar;