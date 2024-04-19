import { TouchableOpacity } from "react-native"
import { Entypo } from '@expo/vector-icons';
const UpdateButton = ({icon, ...otherProps }) => {
    return (
        <TouchableOpacity
            {...otherProps}>
           <Entypo name={icon} size={24} color="gray" />
        </TouchableOpacity>
    )
}
export default UpdateButton
