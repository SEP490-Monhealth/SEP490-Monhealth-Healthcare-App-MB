import { getStorybookUI, configure } from '@storybook/react-native';
import { AppRegistry } from 'react-native';

configure(() => {
  require('../src/stories');
}, module);

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent('MonhealthApp', () => StorybookUIRoot);

export default StorybookUIRoot;
