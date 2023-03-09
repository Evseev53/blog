import { useSelector } from 'react-redux';

import NewArticle from '../new-article/new-article';

export default function EditArticle () {
  const { toolkit } = useSelector(state => state);
  const { fullArticle } = toolkit;

  return(
    <NewArticle defaultValues={ fullArticle } />
  )
}