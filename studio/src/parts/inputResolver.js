import Slider from 'part:@sanity/base/components/unicorn-slider'
export default function resolveInput(type) {
  if (type.name === 'number' && type.options && type.options.range) {
    return Slider
  }
}