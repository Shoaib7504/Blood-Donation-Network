/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Filter, MapPin, Search, SortAsc, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingSpiner from '../../Components/LoadingSpiner';

const ITEMS_PER_PAGE_OPTIONS = [6, 9, 12, 18];

const SearchDonor = () => {


    const [searchText, setSearchText] = useState('');
    const [bloodFilter, setBloodFilter] = useState('');
    const [districtFilter, setDistrictFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [bdDistricts, setBdDistricts] = useState([]);


    const { data: details = [], isLoading, isError } = useQuery({
        queryKey: ["requests"],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/request`);
            return result.data;
        }
    });

    // Fetch BD districts from JSON on mount
    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => {
                const tableEntry = data.find(item => item.type === 'table' && item.name === 'districts');
                if (tableEntry) {
                    setBdDistricts(tableEntry.data);
                }
            })
            .catch(err => console.error('Failed to load districts:', err));
    }, []);


    const bloodGroups = useMemo(
        () => [...new Set(details.map((d) => d.blood).filter(Boolean))].sort(),
        [details]
    );

    // ── helpers
    const getLocationText = (donor) =>
        typeof donor.location === 'string'
            ? donor.location
            : `${donor.location?.district || ''}, ${donor.location?.hospital || ''}`;

    const getDistrict = (donor) => {
        if (typeof donor.location === 'string') return donor.location.split(',')[0]?.trim();
        return donor.location?.district || '';
    };

    // ── filtered + sorted data 
    const processedData = useMemo(() => {
        let filtered = [...details];

        // text search (name + location)
        if (searchText.trim()) {
            const q = searchText.toLowerCase();
            filtered = filtered.filter((d) => {
                const name = (d.name || '').toLowerCase();
                const loc = getLocationText(d).toLowerCase();
                return name.includes(q) || loc.includes(q);
            });
        }

        // blood group filter
        if (bloodFilter) {
            filtered = filtered.filter((d) => d.blood === bloodFilter);
        }

        // district filter
        if (districtFilter) {
            filtered = filtered.filter((d) => getDistrict(d) === districtFilter);
        }

        // sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    const dateA = new Date(a.date + "T" + (a.time || "00:00"));
                    const dateB = new Date(b.date + "T" + (b.time || "00:00"));
                    return dateB - dateA;
                case 'name-asc':
                    return (a.name || '').localeCompare(b.name || '');
                case 'name-desc':
                    return (b.name || '').localeCompare(a.name || '');
                case 'availability':
                    // "Available" first, then others
                    const aAvail = (a.last || 'Available') === 'Available' ? 0 : 1;
                    const bAvail = (b.last || 'Available') === 'Available' ? 0 : 1;
                    return aAvail - bAvail;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [details, searchText, bloodFilter, districtFilter, sortBy]);

    //  pagination 
    const totalPages = Math.max(1, Math.ceil(processedData.length / perPage));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedData = processedData.slice(
        (safePage - 1) * perPage,
        safePage * perPage
    );

    // reset to page 1 when filters change
    const resetPage = () => setCurrentPage(1);

    const handleSearch = (val) => { setSearchText(val); resetPage(); };
    const handleBlood = (val) => { setBloodFilter(val); resetPage(); };
    const handleDistrict = (val) => { setDistrictFilter(val); resetPage(); };
    const handleSort = (val) => { setSortBy(val); resetPage(); };
    const handlePerPage = (val) => { setPerPage(Number(val)); resetPage(); };

    const clearAllFilters = () => {
        setSearchText('');
        setBloodFilter('');
        setDistrictFilter('');
        setSortBy('newest');
        resetPage();
    };

    const hasActiveFilters = searchText || bloodFilter || districtFilter;

    // pagination range (smart ellipsis)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (safePage > 3) pages.push('...');

            const start = Math.max(2, safePage - 1);
            const end = Math.min(totalPages - 1, safePage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (safePage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handleContactDonor = (donor) => {
        if (donor.contact) {
            navigator.clipboard.writeText(donor.contact)
                .then(() => {
                    toast.success(`Contact number of ${donor.name} copied to clipboard!`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                })
                .catch((err) => {
                    console.error('Failed to copy contact number: ', err);
                    toast.error('Failed to copy contact number.');
                });
        } else {
            toast.warn('Contact number not available for this donor.');
        }
    };

    //  loading / error states 
    if (isLoading) return <LoadingSpiner />;
    if (isError) return <p className="text-red-500 text-center">Failed to load data</p>;

    return (
        <section className="px-4 py-12">

            {/* Header */}
            <section className="bg-hero-medical border-b rounded-xl mb-1 border-border">
                <div className="mx-auto px-5 sm:px-8 lg:px-16 py-16">
                    <h1 className="font-display text-4xl font-black sm:text-6xl">
                        Search Donors
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Filter verified donor profiles by blood group and location.
                    </p>
                </div>
            </section>

            <section className='max-w-7xl mx-auto'>

                {/* Search Bar */}
                <div className="mt-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
                    <input
                        id="donor-search"
                        type="text"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by donor name or location…"
                        className="w-full rounded-2xl border bg-white pl-12 pr-12 py-3.5 text-base shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
                                   transition-all placeholder:text-muted-foreground/60"
                    />
                    {searchText && (
                        <button
                            onClick={() => handleSearch('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/*  Filters + Sort Row */}
                <div className="mt-5 rounded-3xl border p-5 shadow-sm bg-white">
                    <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground">
                        <Filter size={16} />
                        <span>Filters &amp; Sorting</span>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="ml-auto flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                            >
                                <X size={14} />
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">

                        {/* Blood Group */}
                        <label className="grid gap-2 text-sm font-semibold">
                            <span>Blood Group</span>
                            <select
                                id="filter-blood-group"
                                value={bloodFilter}
                                onChange={(e) => handleBlood(e.target.value)}
                                className="rounded-xl border px-4 py-2.5 text-gray-600 bg-white
                                           focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="">All Blood Groups</option>
                                {bloodGroups.map((bg) => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </label>

                        {/* District */}
                        <label className="grid gap-2 text-sm font-semibold">
                            <span>District</span>
                            <select
                                id="filter-district"
                                value={districtFilter}
                                onChange={(e) => handleDistrict(e.target.value)}
                                className="rounded-xl border px-4 py-2.5 text-gray-600 bg-white
                                           focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="">All Districts</option>
                                {bdDistricts.map((d) => (
                                    <option key={d.id} value={d.name}>{d.name} ({d.bn_name})</option>
                                ))}
                            </select>
                        </label>

                        {/* Sort */}
                        <label className="grid gap-2 text-sm font-semibold">
                            <span className="flex items-center gap-1">
                                <SortAsc size={14} />
                                Sort By
                            </span>
                            <select
                                id="sort-by"
                                value={sortBy}
                                onChange={(e) => handleSort(e.target.value)}
                                className="rounded-xl border px-4 py-2.5 text-gray-600 bg-white
                                           focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                            >
                                <option value="newest">Newest Requests</option>
                                <option value="name-asc">Name (A → Z)</option>
                                <option value="name-desc">Name (Z → A)</option>
                                <option value="availability">Availability</option>
                            </select>
                        </label>

                        {/* Per Page */}
                        <label className="grid gap-2 text-sm font-semibold">
                            <span>Show per page</span>
                            <select
                                id="per-page"
                                value={perPage}
                                onChange={(e) => handlePerPage(e.target.value)}
                                className="rounded-xl border px-4 py-2.5 text-gray-600 bg-white
                                           focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                            >
                                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                                    <option key={n} value={n}>{n} donors</option>
                                ))}
                            </select>
                        </label>

                    </div>
                </div>

                {/* ═══ Results Count ═══ */}
                <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                    <p>
                        Showing <span className="font-semibold text-foreground">{paginatedData.length}</span> of{' '}
                        <span className="font-semibold text-foreground">{processedData.length}</span> donors
                        {hasActiveFilters && (
                            <span className="ml-1 text-primary">(filtered)</span>
                        )}
                    </p>
                    <p>
                        Page <span className="font-semibold text-foreground">{safePage}</span> of{' '}
                        <span className="font-semibold text-foreground">{totalPages}</span>
                    </p>
                </div>

                {/* ═══ Donor Cards ═══ */}
                {paginatedData.length === 0 ? (
                    <div className="mt-10 flex flex-col items-center justify-center py-20 text-center">
                        <div className="flex size-20 items-center justify-center rounded-full bg-muted mb-4">
                            <Search className="size-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">No donors found</h3>
                        <p className="mt-2 text-muted-foreground max-w-md">
                            Try adjusting your search or filters to find more donors.
                        </p>
                        <button
                            onClick={clearAllFilters}
                            className="mt-4 rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedData.map((donor) => {
                            const locationText = getLocationText(donor);

                            return (
                                <article
                                    key={donor._id}
                                    className="rounded-3xl hover-lift border p-6 shadow-sm bg-white hover:shadow-md transition"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex size-14 items-center justify-center rounded-2xl bg-blush font-display font-bold text-primary">
                                            {donor.name?.split(" ").map(n => n[0]).join("")}
                                        </span>

                                        <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                                            {donor.blood}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-xl font-bold">
                                        {donor.name}
                                    </h3>

                                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="size-4" />
                                        {locationText}
                                    </p>

                                    <p className="mt-2 text-sm text-green-600">
                                        {donor.last || "Available"}
                                    </p>

                                    <button
                                        onClick={() => handleContactDonor(donor)}
                                        className="mt-5 w-full rounded-xl border border-red-300 py-2 text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                                    >
                                        Contact Donor
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* ═══ Pagination ═══ */}
                {totalPages > 1 && (
                    <nav
                        aria-label="Pagination"
                        className="mt-10 flex items-center justify-center gap-1 select-none"
                    >
                        {/* Previous */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium
                                       text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Prev
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map((page, idx) =>
                            page === '...' ? (
                                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                                    …
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`min-w-[40px] rounded-xl px-3 py-2 text-sm font-semibold transition-all
                                        ${safePage === page
                                            ? 'bg-red-500 text-white shadow-md shadow-red-200'
                                            : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium
                                       text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </nav>
                )}

            </section>
        </section>
    );
};

export default SearchDonor;