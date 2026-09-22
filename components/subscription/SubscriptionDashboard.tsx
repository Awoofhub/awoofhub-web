import { useManageSubscription } from '@/features/subscription/useManageSubscription';
import { Subscription } from '@/types/subscription';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import Link from "next/link";

interface Props {
    subscription: Subscription
}

const subscriptionPlans = {
    starter: {
        name: 'Starter Plan',
        duration: '30 days',
        features: [
            {
                title: 'Up to 100 wishlist slots',
                description: 'Save and keep track of deals you are interested in.',
            },
            {
                title: 'Set an alert to a deal poster',
                description: 'Get notified when a deal poster matches your alert.',
            },
            {
                title: '30 days duration',
                description: 'Your subscription remains active for 30 days.',
            },
            {
                title: 'No ads shown',
                description: 'Enjoy the platform without advertisements.',
            },
        ],
    },

    growth: {
        name: 'Growth Plan',
        duration: '30 days',
        features: [
            {
                title: 'Up to 1,000 wishlist slots',
                description: 'Save and keep track of more deals you are interested in.',
            },
            {
                title: 'Set an alert to a deal poster',
                description: 'Get notified when a deal poster matches your alert.',
            },
            {
                title: '30 days duration',
                description: 'Your subscription remains active for 30 days.',
            },
            {
                title: 'No ads shown',
                description: 'Enjoy the platform without advertisements.',
            },
            {
                title: 'Blue checkmark',
                description: 'Get a verified badge on your profile.',
            },
        ],
    },

    pro: {
        name: 'Pro Plan',
        duration: '30 days',
        features: [
            {
                title: 'Unlimited wishlist slots',
                description: 'Save as many deals as you want.',
            },
            {
                title: 'Set unlimited alerts',
                description: 'Create alerts for multiple deal posters.',
            },
            {
                title: '30 days duration',
                description: 'Your subscription remains active for 30 days.',
            },
            {
                title: 'No ads shown',
                description: 'Enjoy the platform without advertisements.',
            },
            {
                title: 'Blue checkmark',
                description: 'Get a verified badge on your profile.',
            },
        ],
    },
} as const;


export default function SubscriptionDashboard({ subscription }: Props) {

    const { manage, isLoading } = useManageSubscription();

    const planName = subscription.user.subscriptionPlan;

    if (!planName) {
        return null;
    }

    const plan = subscriptionPlans[planName];

    return (
        <div className="bg-gray-50 text-gray-800">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">

                    <div>
                        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-1">
                            Your Subscription
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="capitalize">{plan.name}</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Enjoy more visibility, more features and bigger opportunities to your business.
                        </p>
                    </div>

                    <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                            <div className="space-y-3">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                                </span>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Subscription ends</p>
                                    <div className="flex items-center text-gray-900 font-bold text-lg">
                                        <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                                        {subscription.subscriptionExpiresAt}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">(in 14 days)</p>
                                </div>
                            </div>

                            <div className="md:border-l md:border-gray-100 md:pl-8 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">Plan</span>
                                    <span className="bg-orange-50 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                        Monthly
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Growth Plan</h3>
                                <p className="text-xs text-gray-400 pt-2">Amount</p>
                                <p className="text-xl font-extrabold text-gray-900">{`N${subscription.amount / 100}`}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-1">Plan Features</h3>
                        <p className="text-xs text-gray-500 mb-6"> Here's what you get with your {plan.name}.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                            {plan.features.map((feature) => (
                                <div key={feature.title}>
                                    <h4 className="text-sm font-bold text-gray-900 mb-1">
                                        {feature.title}
                                    </h4>

                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Sidebar Column (1 Column width) */}
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-2">Manage your subscription</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                            Update your payment method or cancel your subscription.
                        </p>
                        <button
                            onClick={() => manage()}
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-gray-50 text-orange-600 border border-orange-200 font-medium text-sm py-2.5 px-4 rounded-xl transition">
                            {isLoading ? "Loading..." : "Manage Subscription"}
                        </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-2">Questions?</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                            Check our help center for more details about your subscription.
                        </p>
                        <Link href="/help" className="flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 transition">
                            Visit Help Center <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>

    );
};