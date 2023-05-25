import { Typography, Box, styled, List, Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { backgroundColor } from '../../components/theme';
import { CartItem } from './cartItem';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateTotalCartAmount } from '../../helpers/cartFunctions';
import {
  useCreateCheckoutSessionMutation,
  useDeleteProductOrderMutation,
  useGetUserCartQuery,
} from '../orders/ordersApi';
import { useGetCurrentUserDetailsQuery } from '../users/usersApi';
import { routes } from '../../helpers/routes';

const CartBox = styled('div')(({ theme }) => ({
  backgroundColor: backgroundColor,
  width: '600px',
  padding: theme.spacing(3),
}));

export const Cart = () => {
  const navigate = useNavigate();
  const {
    data: OrderItems = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserCartQuery();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const fullProfile = user?.fullProfile;
  let content;
  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    const renderedItems = OrderItems.map((cartItem) => (
      <List key={cartItem.id}>
        <CartItem id={cartItem.productId} quantity={cartItem.quantity} />
      </List>
    ));
    content = <>{renderedItems}</>;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  const [deleteItem] = useDeleteProductOrderMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const handleCheckout = () => {
    createCheckoutSession({ order: OrderItems, userEmail: user!.email })
      .unwrap()
      .then((data) => (window.location.href = data.url));
    OrderItems.map((item) => item.id).forEach((id) => deleteItem(id));
  };
  return (
    <>
      <CartBox>
        <Typography variant="h5">Your Cart</Typography>
        {OrderItems.length === 0 ? (
          <Typography>So far empty...</Typography>
        ) : (
          <>
            {content}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="secondary"
                variant="text"
                onClick={() =>
                  fullProfile ? handleCheckout() : navigate(routes.ME)
                }
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Go to checkout
              </Button>
              <Typography variant="h6">
                Total: €{calculateTotalCartAmount(OrderItems).toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </CartBox>
    </>
  );
};
