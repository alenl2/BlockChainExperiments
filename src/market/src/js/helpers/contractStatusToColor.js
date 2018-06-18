export default function contractStatusToColor(contract) {
    if(!contract) return ''
    if(contract.refunded) return 'grey'
    if(contract.closed) return 'red'
    return 'teal'
  }