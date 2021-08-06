import App from '../index';
import handleSearch from '../index';
import SearchField from './search';
import SearchResults from './results';
import { shallow } from 'enzyme';

// test('Search String Test', () => {
//     const results = render(<SearchResults />);
//     expect(results).toBeTruthy();
    
// })

// describe('<SearchResults />', () => {
//     it('returns at least one result', () => {
//       const wrapper = shallow(<SearchResults />);
//     //   expect(wrapper.find(Foo)).to.have.lengthOf(3);
//     // expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//     expect(wrapper.find('.title')).to.have.lengthOf(1);
//     })});

    describe('Handle Search input', () => {
      it('It maps the user input to state', () => {
        const searchBar = SearchField();
        searchBar.find(['outlined-basic']).simulate('onChange', 'test');
        expect(App.state('queryString')).toEqual('test');
      //   expect(wrapper.find(Foo)).to.have.lengthOf(3);
      // expect(wrapper.contains(<div className="unique" />)).to.equal(true);
      // expect(wrapper.find('.title')).to.have.lengthOf(1);
      })});