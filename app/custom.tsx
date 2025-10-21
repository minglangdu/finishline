import { Text } from 'react-native'

interface Props {
    [key: string]:any
}

export const Title = (props:Props) => {
    return <Text style={{
        fontSize: 30
    }}>
        {props.children}
    </Text>
}