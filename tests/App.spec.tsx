process.env.VITE_FIREBASE_API_KEY;
process.env.VITE_FIREBASE_AUTH_DOMAIN;
process.env.VITE_FIREBASE_PROJECT_ID;
process.env.VITE_FIREBASE_STORAGE_BUCKET;
process.env.VITE_FIREBASE_MESSAGE_SENDER_ID;
process.env.VITE_FIREBASE_APP_ID;

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import { Header } from '../src/components/common/Header';
import { Footer } from '../src/components/common/Footer';
import { Login } from '../src/pages/Login';
import fetchMock from 'jest-fetch-mock';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Loading } from '../src/components/animetions/Loading';
import { Pagination } from '../src/components/utility/Pagination';

fetchMock.enableMocks();

// Firebaseのモジュールをモック化
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithEmailAndPassword: jest.fn((email: string, password: string) => {
    if (email === process.env.EMAIL && password === process.env.PASSWORD) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error('メールアドレスかパスワードが違います。')
      );
    }
  }),
}));

// scrollTopのモック化
global.window.scrollTo = jest.fn();

// Appコンポーネントのテスト;
describe('Appコンポーネントのテスト', () => {
  test('Appページのレンダーテスト', () => {
    render(<App />);
  });

  test('Appコンポーネントのスナップショットテスト', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});

// Loginコンポーネントのテスト;
describe('Loginコンポーネントのテスト', () => {
  test('正しいメールアドレスと正しいパスワードを入力したときのテスト', async () => {
    // モック関数をセットアップ
    const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<
      typeof signInWithEmailAndPassword
    >;

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.anything(),
        email,
        password
      );
      expect(screen.getByTestId('error-text')).toBeEmptyDOMElement();
    });
  });

  test('正しくないメールアドレスと正しいパスワードを入力したときのテスト', async () => {
    // モック関数をセットアップ
    const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<
      typeof signInWithEmailAndPassword
    >;

    const email = 'test@gmail.com';
    const password = process.env.PASSWORD;
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.anything(),
        email,
        password
      );
      expect(
        screen.getByText('メールアドレスかパスワードが違います。')
      ).toBeInTheDocument();
    });
  });

  test('正しいメールアドレスと正しくないパスワードを入力したときのテスト', async () => {
    // モック関数をセットアップ
    const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<
      typeof signInWithEmailAndPassword
    >;

    const email = process.env.EMAIL;
    const password = 'dummyPassword';
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.anything(),
        email,
        password
      );
      expect(
        screen.getByText('メールアドレスかパスワードが違います。')
      ).toBeInTheDocument();
    });
  });

  test('メールアドレスが空白でパスワードが入力されたときのテスト', async () => {
    const email = '';
    const password = process.env.PASSWORD;
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(
        screen.getByText('メールアドレスとパスワード両方入力してください。')
      ).toBeInTheDocument();
    });
  });

  test('メールアドレスが入力されて、パスワードが空白のときのテスト', async () => {
    const email = process.env.EMAIL;
    const password = '';
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(
        screen.getByText('メールアドレスとパスワード両方入力してください。')
      ).toBeInTheDocument();
    });
  });
});

// Headerコンポーネントのテスト
describe('Headerコンポーネントのテスト', () => {
  test('Headerコンポーネントのレンダーテスト', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  test('Headerページのスナップショットテスト', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

// Loadingコンポーネントのテスト
describe('Loadingコンポーネントのテスト', () => {
  test('Loadingのレンダーテスト', () => {
    render(
      <BrowserRouter>
        <Loading />
      </BrowserRouter>
    );
  });
});

// Paginationコンポーネントのテスト
describe('Paginationコンポーネントのテスト', () => {
  test('Paginationのレンダーテスト', () => {
    render(
      <BrowserRouter>
        <Pagination pageId={1} currentPage={1} paginationNumber={10} />
      </BrowserRouter>
    );
  });

  test('Paginationコンポーネントのスナップショットテスト', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Pagination pageId={1} currentPage={1} paginationNumber={10} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Paginationの子コンポーネントのレンダーテスト', () => {
    render(
      <BrowserRouter>
        <Pagination pageId={1} currentPage={1} paginationNumber={10} />
      </BrowserRouter>
    );
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
  });

  test('Paginationのパステスト', () => {
    render(
      <BrowserRouter>
        <Pagination pageId={1} currentPage={1} paginationNumber={10} />
      </BrowserRouter>
    );
    expect(screen.getByText('<').closest('a')).toHaveAttribute('href', '/0');
    expect(screen.getByText('>').closest('a')).toHaveAttribute('href', '/2');
  });

  test('PaginationコンポーネントにLinkが2つあるか', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <Pagination pageId={1} currentPage={1} paginationNumber={10} />
      </BrowserRouter>
    );
    const links = getAllByRole('link');
    expect(links.length).toBe(2);
  });
});

// Footerコンポーネントのテスト
describe('Footerコンポーネントのテスト', () => {
  test('Footerコンポーネントのレンダーテスト', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test('Footerページのスナップショットテスト', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
