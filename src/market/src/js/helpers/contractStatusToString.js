export default function contractStatusToString(contract) {
  if(!contract) return ''
  if(contract.refunded) return 'refund'
  if(contract.closed) return 'closed'
  return 'open'
}

