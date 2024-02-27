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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Loading } from '../src/components/animetions/Loading';
import { Pagination } from '../src/components/utility/Pagination';
import { Recipe } from '../src/pages/Recipe';
import { RecipeList } from '../src/components/common/RecipeList';
import { Card } from '../src/components/common/Card';
import { RecipeDetail } from '../src/pages/RecipeDetail';
import { DummyRecipeData } from './dummyDatas/DummyRecipeData';
import { DummyRelationData } from './dummyDatas/DummyRelationData';
import { RecipeListJudge } from '../src/components/utility/RecipeListJudge';
import { RecipeDetailJudge } from '../src/components/utility/RecipeDetailJudge';
import { RecipeType } from '../src/components/utility/type/RecipeType';

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

// filter関数をモック化する
const filterTestFn = jest.fn();
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

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

// Recipeコンポーネントのテスト
describe('Recipeコンポーネントのテスト', () => {
  const mockResponse = {
    ok: true,
    json: jest.fn().mockResolvedValue(DummyRecipeData),
  };
  test('Recipeコンポーネントのレンダー&スナップショットテスト', () => {
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    const { asFragment } = render(
      <BrowserRouter>
        <Recipe />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

// RecipeListコンポーネントのテスト
describe('RecipeListコンポーネントのテスト', () => {
  test('RecipeListコンポーネントのレンダー&スナップショットテスト', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <RecipeList posts={DummyRecipeData} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

// Cardコンポーネントのテスト
describe('Cardコンポーネントのテスト', () => {
  test('Cardコンポーネントのレンダー&スナップショットテスト', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Card posts={DummyRecipeData} firstPost={0} lastPost={9} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Cardコンポーネントでダミーデータのレシピの名前やカテゴリが表示されているかテスト', () => {
    render(
      <BrowserRouter>
        <Card posts={DummyRecipeData} firstPost={0} lastPost={9} />
      </BrowserRouter>
    );

    expect(screen.getByText('パスタ')).toBeInTheDocument();
    expect(screen.getByText('洋食')).toBeInTheDocument();
    expect(screen.getByText('味噌汁')).toBeInTheDocument();
    expect(screen.getByText('和食')).toBeInTheDocument();
    expect(screen.getByText('チャーハン')).toBeInTheDocument();
    expect(screen.getByText('中華料理')).toBeInTheDocument();
    expect(screen.getByText('キムチ')).toBeInTheDocument();
    expect(screen.getByText('韓国料理')).toBeInTheDocument();
    expect(screen.getByText('ガパオライス')).toBeInTheDocument();
    expect(screen.getByText('その他')).toBeInTheDocument();
  });

  test('CardコンポーネントでRelationが表示されているかテスト', () => {
    render(
      <BrowserRouter>
        <Card
          posts={DummyRelationData}
          recipeId={'r1'}
          relationCategory={'洋食'}
        />
      </BrowserRouter>
    );

    expect(screen.queryByText('パスタ')).not.toBeInTheDocument();
    expect(screen.getByText('ピザ')).toBeInTheDocument();
    expect(screen.getByText('パン')).toBeInTheDocument();
    expect(screen.getByText('パンケーキ')).toBeInTheDocument();
  });
});

// RecipeDetailコンポーネントのテスト
describe('RecipeDetailコンポーネントのテスト', () => {
  const mockResponse = {
    ok: true,
    json: jest.fn().mockResolvedValue(DummyRecipeData),
  };

  test('RecipeDetailコンポーネントのレンダー&スナップショットテスト', () => {
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    const { asFragment } = render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

// RecipeListJudge関数のテスト
describe('RecipeListJudge判定のテスト', () => {
  test('RecipeListJudgeのtrue判定', () => {
    const id = 2;
    const paginationNumber = 3;
    expect(RecipeListJudge(id, paginationNumber)).toBe(true);
  });

  test('idが0の時（false判定）', () => {
    const id = 0;
    const paginationNumber = 3;
    expect(RecipeListJudge(id, paginationNumber)).toBe(false);
  });

  test('idがpaginationNumberより値が大きい時（false判定）', () => {
    const id = 4;
    const paginationNumber = 3;
    expect(RecipeListJudge(id, paginationNumber)).toBe(false);
  });

  test('idがNumber以外の値の時（false判定）', () => {
    const id = 'abc';
    const paginationNumber = 3;
    expect(RecipeListJudge(id, paginationNumber)).toBe(false);
  });
});

// RecipeDetailJudge関数のテスト
describe('RecipeDetailJudge判定のテスト', () => {
  test('投稿があるとき（true判定）', () => {
    expect(RecipeDetailJudge(DummyRecipeData)).toBe(true);
  });

  test('投稿がないとき（false判定）', () => {
    const NullPosts: RecipeType[] = [];
    expect(RecipeDetailJudge(NullPosts)).toBe(false);
  });
});
