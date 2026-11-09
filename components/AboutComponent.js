import React, { Component } from "react";
import { Text, FlatList, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { Card, ListItem, Avatar } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import Loading from './LoadingComponent';

class RenderHistory extends Component 
{
  render() {
    return (
      <Card>
        <Card.Title>Our History</Card.Title>
        <Card.Divider style={{ height: 1 }} />
        <Text style={{ margin: 10 }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong. With its unique brand of
          world fusion cuisine that can be found nowhere else, it enjoys
          patronage from the A-list clientele in Hong Kong. Featuring four of
          the best three-star Michelin chefs in the world, you never know what
          will arrive on your plate the next time you visit us.
        </Text>
        <Text style={{ margin: 10 }}>
          The restaurant traces its humble beginnings to The Frying Pan, a
          successful chain started by our CEO, Mr. Peter Pan, that featured for
          the first time the worlds best cuisines in a pan.
        </Text>
      </Card>
    );
  }
}

class RenderLeadership extends Component 
{
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider style={{ height: 1 }} />
          <Loading />
        </Card>
      );
    } 
    else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider style={{ height: 1 }} />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } 
    else {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider style={{ height: 1 }} />
          <FlatList
            data={this.props.leaders}
            renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      );
    }
  }
  renderLeaderItem(item, index) {
    const imagePath = item.image.startsWith("/")
      ? item.image
      : `/${item.image}`;

    return (
      <ListItem>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar rounded source={{ uri: `${baseUrl}${imagePath}` }} />
          <ListItem.Content style={{ marginLeft: 10 }}>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </View>
      </ListItem>
    );
  }
}

import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <RenderHistory />
        <RenderLeadership leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess} />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);
