import Swal from 'sweetalert2';

const displayAlert = ({ 
    title = "Default Title", 
    text = "Default Text", 
    icon = "info", 
    confirmButtonText = "Ok", 
    showCancelButton = false 
} = {}) => {
    if (title === "Default Title" && text === "Default Text") {
        console.error("displayAlert called without parameters");
        return; 
    }
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton,
        cancelButtonText: "Cancelar"
    });
};

export default displayAlert;