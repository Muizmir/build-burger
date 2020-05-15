import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './navigation-items';
import NavigationItem from './nav-item/nav-item';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    it('should render 2 nav items if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render 3 nav items if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should render a logout component if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.contains(<NavigationItem link='/logout'> Log OUT </NavigationItem>)).toEqual(true);
    })
})