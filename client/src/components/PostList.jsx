import React, { useEffect, useState } from 'react'
import Post from '../components/Post';
import { useSelector, connect } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import { addPosts } from '../actions/Actions';

const PostList = ({ dispatch }) => {

    const [pagination, setPagination] =
        useState({
            per: 3,
            page: 1,
            scrolling: false
        });

    const useStyles = makeStyles(theme => ({
        loadingMore: {
            margin: "auto",
            display: "block",
        }
    }));

    const classes = useStyles();
    const posts = useSelector(state => state.posts);

    useEffect(() => {

        loadPost();

        const scrollListener = window.addEventListener("scroll", e => {
            // handleScroll(e);
        });

    }, [pagination.page])


    const loadPost = () => {
        const { per, page } = pagination;
        fetch(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/posts/${per}/${page}`)
            .then(res => res.json())
            .then(res => {
                dispatch(addPosts(res));
                setPagination({
                    ...pagination,
                    scrolling: false
                });
            });
    };

    const loadMore = () => {
        setPagination({
            ...pagination,
            page: pagination.page + 1,
            scrolling: true
        });
    };

    const handleScroll = () => {
        var lastLi = document.querySelector("ul.container > li:last-child");
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastLiOffset) {
            loadMore();
        }
    };

    return (
        <div>
            {
                posts.map((value, index) =>
                    <Post post={value} key={index} />)
            }
            <Button className={classes.loadingMore}
                onClick={e => loadMore()}>
                Load More...</Button>

        </div>)
}


export default connect()(PostList)
