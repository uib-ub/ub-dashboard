import { InfoboxMissingData } from '@/components/infobox-missing-data'
import { Slider } from '@/components/ui/slider'

export interface SkillListProps {
  label: string
  level: number
  shortDescription: string
}

export const Skills = ({ data = [] }: { data?: SkillListProps[] }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2>Kompetanse</h2>

      {!data ? (
        <InfoboxMissingData>Kompentanse ikke registrert</InfoboxMissingData>
      ) : (
        <div className='flex flex-col mt-2'>
          {data?.map((skill, index) => (
            <div key={index} className='grid grid-cols-2 gap-2 w-fit'>
              <div className='w-64'>{skill.label}</div>
              <div className='flex gap-2 w-80'>
                <span className='text-zinc-400 dark:text-zinc-300'>1</span>
                <Slider
                  defaultValue={[skill.level]}
                  max={10}
                  step={1}
                  disabled={true}
                />
                <span className='text-zinc-400 dark:text-zinc-300'>10</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
