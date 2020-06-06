import React, { Component, Fragment } from 'react';
import {View} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

let items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
export default class CreateMapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        }
      ]
    }
  }
  render() {
    return (
        <View style={{flex:1}}>
          {/* Multi */}
          <SearchableDropdown
              multi={true}
              selectedItems={this.state.selectedItems}
              onItemSelect={(item) => {
                const items = this.state.selectedItems;
                items.push(item)
                this.setState({ selectedItems: items });
              }}
              containerStyle={{ padding: 5 }}
              onRemoveItem={(item, index) => {
                const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                this.setState({ selectedItems: items });
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={2}
              chip={true}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "placeholder",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  onTextChange: text => alert(text)
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
          />
          {/* Single */}
          <SearchableDropdown
              onItemSelect={(item) => {
                console.log(item)
                // const items = this.state.selectedItems;
                // items.push(item)
                // this.setState({ selectedItems: items });
              }}
              containerStyle={{ padding: 5 }}
              // onRemoveItem={(item, index) => {
              //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              //   this.setState({ selectedItems: items });
              // }}
              itemStyle={{
                height:40,
                width:300,
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              defaultIndex={2}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "placeholder",
                  underlineColorAndroid: "transparent",
                  style: {
                    height:40,
                    width:300,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  onTextChange: text => alert(text)
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
          />
        </View>
    );
  }
}
