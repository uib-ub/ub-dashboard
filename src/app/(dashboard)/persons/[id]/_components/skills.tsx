import { Slider } from '@/components/ui/slider'

export interface SkillListProps {
  label: string
  level: number
  shortDescription: string
}

export const Skills = ({ data = [] }: { data: SkillListProps[] }) => {
  return (
    <div className='p-4 border rounded-sm'>
      <h2>Kompetanse</h2>
      <div className='flex flex-col mt-2'>
        {data?.map((skill, index) => (
          <div key={index} className='flex flex-row justify-between gap-2'>
            <div>{skill.label}</div>
            <div className='flex gap-2 w-1/2'>
              <span className='text-muted'>1</span>
              <Slider
                defaultValue={[skill.level]}
                max={10}
                step={1}
                disabled={true}
                className=''
              />
              <span className='text-muted'>10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
