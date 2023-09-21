import { SaveConfigProvider } from '../../contexts/SaveConfigContext'
import { SetConfig } from './ConfigsDescription.'
import { ConfigHeading } from './SetConfig'

export const UserConfig = () => {
  return (
    <div className='user-config'>
      <SaveConfigProvider>
        <ConfigHeading />
        <SetConfig />
      </SaveConfigProvider>
    </div>
  )
}
