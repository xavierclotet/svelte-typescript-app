import { render } from '@testing-library/svelte';
import { Hotness } from './Hotness.svelte';

describe('Index', () => {
  it('should render component', () => {
    const { getByTestId } = render(Hotness);
    const element = getByTestId('info');
    expect(element).toHaveTextContent('info');
  });
  
});