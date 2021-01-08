import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import * as dependency from './services/blogs';

const user = {
  username: 'Username',
  name: 'Name',
  token: 'token',
};

const blog = {
  title: 'Title',
  author: 'Bobby',
  url: 'http://localhost',
  likes: 999,
  user,
};

test('renders content', async () => {
  const component = render(
    <Blog blog={blog} setBlogs={() => { }} user={user} />
  );

  const title = component.getByTestId('title');
  const author = component.getByTestId('author');
  const button = component.getByTestId('button-view');

  const url = await component.queryByTestId('url');
  const likes = await component.queryByTestId('likes');
  const buttonLike = await component.queryByTestId('button-like');
  const buttonRemove = await component.queryByTestId('button-remove');

  expect(title).toHaveTextContent(
    'Title'
  );

  expect(author).toHaveTextContent(
    'Bobby'
  );

  expect(url).toBeNull();
  expect(likes).toBeNull();
  expect(buttonLike).toBeNull();
  expect(buttonRemove).toBeNull();
})

test('renders content on click', async () => {
  const component = render(
    <Blog blog={blog} setBlogs={() => { }} user={user} />
  );

  const title = component.getByTestId('title');
  const author = component.getByTestId('author');
  const buttonView = component.getByTestId('button-view');

  expect(title).toHaveTextContent(
    'Title'
  );

  expect(author).toHaveTextContent(
    'Bobby'
  );

  fireEvent.click(buttonView);

  const url = component.getByTestId('url');
  const likes = component.getByTestId('likes');
  const buttonLike = component.getByTestId('button-like');
  const buttonRemove = component.getByTestId('button-remove');


  expect(url).toHaveTextContent('http://localhost');
  expect(likes).toHaveTextContent('999');
  expect(buttonLike).toBeDefined();
  expect(buttonRemove).toBeDefined();
})

test('counts like button clicks', async () => {
  dependency.updateBlog = jest.fn();
  dependency.getAll = jest.fn();
  dependency.updateBlog.mockReturnValue(Promise.resolve());
  dependency.getAll.mockReturnValue(Promise.resolve([]));
  const component = render(
    <Blog blog={blog} setBlogs={() => { }} user={user} />
  );

  const title = component.getByTestId('title');
  const author = component.getByTestId('author');
  const buttonView = component.getByTestId('button-view');

  expect(title).toHaveTextContent(
    'Title'
  );

  expect(author).toHaveTextContent(
    'Bobby'
  );

  fireEvent.click(buttonView);

  const url = component.getByTestId('url');
  const likes = component.getByTestId('likes');
  const buttonLike = component.getByTestId('button-like');
  const buttonRemove = component.getByTestId('button-remove');


  expect(url).toHaveTextContent('http://localhost');
  expect(likes).toHaveTextContent('999');
  expect(buttonLike).toBeDefined();
  expect(buttonRemove).toBeDefined();

  await fireEvent.click(buttonLike);
  await fireEvent.click(buttonLike);

  expect(dependency.updateBlog.mock.calls).toHaveLength(2);
})

test('counts like button clicks', async () => {
  dependency.updateBlog = jest.fn();
  dependency.getAll = jest.fn();
  dependency.updateBlog.mockReturnValue(Promise.resolve());
  dependency.getAll.mockReturnValue(Promise.resolve([]));
  const component = render(
    <Blog blog={blog} setBlogs={() => { }} user={user} />
  );

  const title = component.getByTestId('title');
  const author = component.getByTestId('author');
  const buttonView = component.getByTestId('button-view');

  expect(title).toHaveTextContent(
    'Title'
  );

  expect(author).toHaveTextContent(
    'Bobby'
  );

  fireEvent.click(buttonView);

  const url = component.getByTestId('url');
  const likes = component.getByTestId('likes');
  const buttonLike = component.getByTestId('button-like');
  const buttonRemove = component.getByTestId('button-remove');


  expect(url).toHaveTextContent('http://localhost');
  expect(likes).toHaveTextContent('999');
  expect(buttonLike).toBeDefined();
  expect(buttonRemove).toBeDefined();

  await fireEvent.click(buttonLike);
  await fireEvent.click(buttonLike);

  expect(dependency.updateBlog.mock.calls).toHaveLength(2);
});

test('tests blog creation form', async () => {
  const submitBlogSpy = jest.fn();
  const component = render(
    <CreateBlogForm submitBlog={submitBlogSpy} />
  );

  const titleInput = component.getByTestId('input-title');
  fireEvent.change(titleInput, { target: { value: 'Title1' } });
  const authorInput = component.getByTestId('input-author');
  fireEvent.change(authorInput, { target: { value: 'Author1' } });
  const urlInput = component.getByTestId('input-url');
  fireEvent.change(urlInput, { target: { value: 'Url1' } });

  fireEvent.click(component.getByTestId('button-create-blog'));

  expect(submitBlogSpy).toBeCalledWith({
    title: 'Title1',
    author: 'Author1',
    url: 'Url1'
  });
});