import React, { Component, PureComponent } from 'react';
import { View, Text, ImageBackground, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';

// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
import { baseUrl } from '../shared/baseUrl';

const getImageUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return baseUrl + (image.startsWith('/') ? image : '/' + image);
};

// Sử dụng PureComponent để tránh re-render khi gõ chữ trong form
class RenderDish extends PureComponent {
  render() {
    const dish = this.props.dish;

    if (dish != null) {
      return (
        <Card>
          <ImageBackground
            source={{ uri: getImageUrl(dish.image) }}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7cc'
            }}
          >
            <Card.FeaturedTitle style={{ fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 8 }}>
              {dish.name}
            </Card.FeaturedTitle>
          </ImageBackground>

          <Text style={{ margin: 10 }}>
            {dish.description}
          </Text>

          {/* [2.1] Căn giữa 2 icon: Favorite và Pencil */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon
              raised
              reverse
              type="font-awesome"
              color="#f50"
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() =>
                this.props.favorite
                  ? alert('Already favorite')
                  : this.props.onPressFavorite()
              }
            />
            <Icon
              raised
              reverse
              type="font-awesome"
              color="#7cc"
              name="pencil"
              onPress={() => this.props.onPressComment()}
            />
          </View>
        </Card>
      );
    }

    return <View />;
  }
}

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};
import { postFavorite, postComment } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

// Sử dụng PureComponent để tránh re-render FlatList khi nhập text
class RenderComments extends PureComponent {
  render() {
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider style={{ height: 1 }} />

        <FlatList
          data={this.props.comments}
          renderItem={({ item, index }) =>
            this.renderCommentItem(item, index)
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }

  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>
          {item.comment}
        </Text>

        {/* [2.2] Hiển thị rating bằng các ngôi sao căn lề trái */}
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={12}
          showRating={false}
          style={{ alignItems: 'flex-start', paddingVertical: 5 }}
        />

        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}
        </Text>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // dishes: DISHES,
      // comments: COMMENTS,
      favorites: [],
      showModal: false,
      rating: 5,
      author: '',
      comment: ''
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      rating: 5,
      author: '',
      comment: ''
    });
  }

  handleComment(dishId) {
    // [2.4] Dispatch action thêm comment
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.resetForm();
  }

  render() {
    const dishId = parseInt(
      this.props.route.params.dishId,
      10
    );

    const dish = (this.props.dishes.dishes && this.props.dishes.dishes.find((d) => d.id === dishId)) || this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);

    return (
      // Bọc toàn bộ bằng View flex: 1 và tách Modal ra ngoài ScrollView
      <View style={{ flex: 1 }}>
        <ScrollView>
          <RenderDish
            dish={dish}
            favorite={favorite}
            onPressFavorite={() => this.markFavorite(dishId)}
            onPressComment={() => this.toggleModal()}
          />

          <RenderComments comments={comments} />
        </ScrollView>

        {/* [2.3] Modal Form thêm Comment đặt NGANG HÀNG với ScrollView */}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.resetForm()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              ratingCount={5}
              fractions={0}
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />

            <Input
              placeholder="Author"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}
            />

            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              onChangeText={(comment) => this.setState({ comment: comment })}
              value={this.state.comment}
            />

            <View style={{ margin: 10 }}>
              <Button
                title="SUBMIT"
                color="#7cc"
                onPress={() => this.handleComment(dishId)}
              />
            </View>

            <View style={{ margin: 10 }}>
              <Button
                title="CANCEL"
                color="#757575"
                onPress={() => this.resetForm()}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});