'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { IUser } from '@/Interfaces/User'
import CreateProduct from '@/app/Products/[id]/(Components)/CreateProduct'
import ProductList from '@/app/Products/[id]/(Components)/ProductList'
import UserInfo from '@/app/Products/[id]/(Components)/UserInfo'
import { getUser } from '@/lib/userServices'
import { productApi } from '@/lib/productServices2'
import { Clipboard, Bell, Send, User2 } from 'lucide-react'
import { Star } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Loader from '@/Utils/Loader'
import SellerChat from './(Components)/SellerChat'

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id: sellerId } = React.use(params);
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<IUser | null>(null);
    const [isCreateProduct, setIsCreateProduct] = useState(false);
    const { user: myUser } = useSelector((state: RootState) => state.userServices);

    const { data: products, isLoading: gettingProducts, status } = productApi.useGetSellerProductsQuery(sellerId, {
        skip: !sellerId,
    });

    async function getUserData() {
        const result = await dispatch(getUser(sellerId));
        if (getUser.fulfilled.match(result)) {
            setUser(result.payload);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const isCurrentUserSeller = useMemo(() => !!user?.isSeller && sellerId === myUser?.id, [user, sellerId, myUser]);

    return (
        <div className="container mx-auto px-4 space-y-8">
            <UserInfo user={user} />
            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                <div className='w-full lg:w-[65%]'>
                    <ProductList
                        products={products?.items || []}
                        loading={gettingProducts}
                        isSeller={isCurrentUserSeller || false}
                        sellerId={sellerId}
                        onAddProduct={() => setIsCreateProduct(true)}
                    />
                </div>
                <SellerChat user={user} products={products?.items || []} />
            </div>

            {isCreateProduct &&
                <CreateProduct onClose={() => setIsCreateProduct(false)} />}
        </div>
    )
}
