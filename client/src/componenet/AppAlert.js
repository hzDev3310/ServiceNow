import { View, Text, Modal, TouchableOpacity } from 'react-native';
import AppBadge from './AppBadge';
import AppText from './AppText';
import AppSeparator from './AppSeparator';
import colors from '../colors'



const AppAlert = ({ visible = false, message, onClose, error = false }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <AppBadge classname={`p-4 rounded-xl flex  items-center  w-3/4 ${error && 'bg-red-200'}`}>
         
            
            <AppText className={`ml-1 text-lg ${error && "text-red-950"}`}  >{message}</AppText>
        
         
         <AppSeparator classname="mt-4 mb-1" color={error ? colors.danger : colors.primary} />
      

          <TouchableOpacity onPress={onClose} >
            <Text className='text-base' style={{ color: error ? colors.danger : colors.primary }}>Close</Text>
          </TouchableOpacity>
        </AppBadge>
      </View>
    </Modal>
  );
};

export default AppAlert;
