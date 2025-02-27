import React from 'react'
import { BadgeCheck, Star, User2, Store } from 'lucide-react'
import FormatDate from '@/Utils/FormatDate'
import { IUser } from '@/Interfaces/User'
import Loader from '@/Utils/Loader'

export default function UserInfo({ user }: { user: IUser | null }) {
    return (
        <div className="bg-[var(--bg-secondary)]/70 rounded-xl p-6 shadow-lg border border-[var(--border)]">
            {user == null ? <Loader /> : <div className="flex items-start gap-6">
                {/* User Avatar */}
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center">
                        <User2 className="w-12 h-12 text-[var(--accent-primary)]" />
                    </div>
                    {user?.isVerified && (
                        <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-green-500" />
                    )}
                </div>

                {/* User Details */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                                    {user?.username}
                                </h1>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-medium">4.8</span>
                                </div>
                            </div>
                            <p className="text-[var(--text-secondary)]">
                                {user?.firstName} {user?.lastName}
                            </p>
                        </div>
                        <div className='flex flex-col gap-2 items-center'>
                            {user?.isSeller && (
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10">
                                    <Store className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-green-500">
                                        {user?.isVerifiedSeller ? 'Verified Seller' : 'Seller'}
                                    </span>
                                </div>
                            )}
                            <div className="text-[var(--text-secondary)] pt-5">
                                {<div className='flex flex-col'>
                                    <span className="text-[var(--text-secondary)] uppercase text-[8px]">Registration date</span>
                                    <span>{FormatDate(user?.createdAt || '').timeAgo}</span>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}
