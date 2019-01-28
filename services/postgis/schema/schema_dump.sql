--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE rentality;
--
-- Name: rentality; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE rentality WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


\connect rentality

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger;


--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger_data;


--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA topology;


--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_emailaddress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_emailaddress (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    verified boolean NOT NULL,
    "primary" boolean NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.account_emailaddress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.account_emailaddress_id_seq OWNED BY public.account_emailaddress.id;


--
-- Name: account_emailconfirmation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_emailconfirmation (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    sent timestamp with time zone,
    key character varying(64) NOT NULL,
    email_address_id integer NOT NULL
);


--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.account_emailconfirmation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.account_emailconfirmation_id_seq OWNED BY public.account_emailconfirmation.id;


--
-- Name: admin_custom_activitylog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_custom_activitylog (
    id integer NOT NULL,
    object_id integer,
    level character varying(1) NOT NULL,
    meta_info jsonb,
    create_time timestamp with time zone NOT NULL,
    actor_id integer,
    content_type_id integer,
    CONSTRAINT admin_custom_activitylog_object_id_check CHECK ((object_id >= 0))
);


--
-- Name: admin_custom_activitylog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_custom_activitylog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_custom_activitylog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_custom_activitylog_id_seq OWNED BY public.admin_custom_activitylog.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: billing_fee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.billing_fee (
    id integer NOT NULL,
    tenant_charge numeric(5,2) NOT NULL,
    home_owner_charge numeric(5,2) NOT NULL,
    "GST" numeric(5,2) NOT NULL,
    active boolean NOT NULL
);


--
-- Name: billing_fee_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.billing_fee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: billing_fee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.billing_fee_id_seq OWNED BY public.billing_fee.id;


--
-- Name: billing_order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.billing_order (
    id integer NOT NULL,
    charge_id character varying(64) NOT NULL,
    application_id integer NOT NULL
);


--
-- Name: billing_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.billing_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: billing_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.billing_order_id_seq OWNED BY public.billing_order.id;


--
-- Name: blog_article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_article (
    id integer NOT NULL,
    title character varying(250) NOT NULL,
    keywords text NOT NULL,
    description character varying(160) NOT NULL,
    abstract character varying(250) NOT NULL,
    content text NOT NULL,
    slug character varying(50) NOT NULL,
    priority smallint NOT NULL,
    thumbnail character varying(100) NOT NULL,
    tags text NOT NULL,
    active boolean NOT NULL,
    update_time timestamp with time zone NOT NULL,
    create_time timestamp with time zone NOT NULL,
    CONSTRAINT blog_article_priority_check CHECK ((priority >= 0))
);


--
-- Name: blog_article_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blog_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blog_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blog_article_id_seq OWNED BY public.blog_article.id;


--
-- Name: cities_alternativename; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_alternativename (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    language_code character varying(100) NOT NULL,
    is_preferred boolean NOT NULL,
    is_short boolean NOT NULL,
    is_colloquial boolean NOT NULL,
    is_historic boolean NOT NULL,
    kind character varying(4) NOT NULL,
    slug character varying(255)
);


--
-- Name: cities_alternativename_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_alternativename_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_alternativename_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_alternativename_id_seq OWNED BY public.cities_alternativename.id;


--
-- Name: cities_city; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_city (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    name_std character varying(200) NOT NULL,
    location public.geometry(Point,4326) NOT NULL,
    population integer NOT NULL,
    elevation integer,
    kind character varying(10) NOT NULL,
    timezone character varying(40) NOT NULL,
    country_id integer NOT NULL,
    region_id integer,
    subregion_id integer
);


--
-- Name: cities_city_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_city_alt_names (
    id integer NOT NULL,
    city_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_city_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_city_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_city_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_city_alt_names_id_seq OWNED BY public.cities_city_alt_names.id;


--
-- Name: cities_city_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_city_id_seq OWNED BY public.cities_city.id;


--
-- Name: cities_continent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_continent (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    code character varying(2) NOT NULL
);


--
-- Name: cities_continent_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_continent_alt_names (
    id integer NOT NULL,
    continent_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_continent_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_continent_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_continent_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_continent_alt_names_id_seq OWNED BY public.cities_continent_alt_names.id;


--
-- Name: cities_continent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_continent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_continent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_continent_id_seq OWNED BY public.cities_continent.id;


--
-- Name: cities_country; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_country (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    code character varying(2) NOT NULL,
    code3 character varying(3) NOT NULL,
    population integer NOT NULL,
    area integer,
    currency character varying(3),
    currency_name character varying(50),
    language_codes character varying(250),
    phone character varying(20) NOT NULL,
    tld character varying(5) NOT NULL,
    capital character varying(100) NOT NULL,
    continent_id integer,
    currency_symbol character varying(31),
    postal_code_format character varying(127) NOT NULL,
    postal_code_regex character varying(255) NOT NULL
);


--
-- Name: cities_country_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_country_alt_names (
    id integer NOT NULL,
    country_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_country_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_country_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_country_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_country_alt_names_id_seq OWNED BY public.cities_country_alt_names.id;


--
-- Name: cities_country_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_country_id_seq OWNED BY public.cities_country.id;


--
-- Name: cities_country_neighbours; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_country_neighbours (
    id integer NOT NULL,
    from_country_id integer NOT NULL,
    to_country_id integer NOT NULL
);


--
-- Name: cities_country_neighbours_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_country_neighbours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_country_neighbours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_country_neighbours_id_seq OWNED BY public.cities_country_neighbours.id;


--
-- Name: cities_district; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_district (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    name_std character varying(200) NOT NULL,
    location public.geometry(Point,4326) NOT NULL,
    population integer NOT NULL,
    city_id integer NOT NULL,
    code character varying(200)
);


--
-- Name: cities_district_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_district_alt_names (
    id integer NOT NULL,
    district_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_district_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_district_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_district_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_district_alt_names_id_seq OWNED BY public.cities_district_alt_names.id;


--
-- Name: cities_district_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_district_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_district_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_district_id_seq OWNED BY public.cities_district.id;


--
-- Name: cities_postalcode; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_postalcode (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    code character varying(20) NOT NULL,
    location public.geometry(Point,4326) NOT NULL,
    region_name character varying(100) NOT NULL,
    subregion_name character varying(100) NOT NULL,
    district_name character varying(100) NOT NULL,
    country_id integer NOT NULL,
    city_id integer,
    district_id integer,
    region_id integer,
    subregion_id integer
);


--
-- Name: cities_postalcode_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_postalcode_alt_names (
    id integer NOT NULL,
    postalcode_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_postalcode_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_postalcode_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_postalcode_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_postalcode_alt_names_id_seq OWNED BY public.cities_postalcode_alt_names.id;


--
-- Name: cities_postalcode_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_postalcode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_postalcode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_postalcode_id_seq OWNED BY public.cities_postalcode.id;


--
-- Name: cities_region; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_region (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    name_std character varying(200) NOT NULL,
    code character varying(200) NOT NULL,
    country_id integer NOT NULL
);


--
-- Name: cities_region_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_region_alt_names (
    id integer NOT NULL,
    region_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_region_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_region_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_region_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_region_alt_names_id_seq OWNED BY public.cities_region_alt_names.id;


--
-- Name: cities_region_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_region_id_seq OWNED BY public.cities_region.id;


--
-- Name: cities_subregion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_subregion (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    slug character varying(255),
    name_std character varying(200) NOT NULL,
    code character varying(200) NOT NULL,
    region_id integer NOT NULL
);


--
-- Name: cities_subregion_alt_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities_subregion_alt_names (
    id integer NOT NULL,
    subregion_id integer NOT NULL,
    alternativename_id integer NOT NULL
);


--
-- Name: cities_subregion_alt_names_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_subregion_alt_names_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_subregion_alt_names_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_subregion_alt_names_id_seq OWNED BY public.cities_subregion_alt_names.id;


--
-- Name: cities_subregion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cities_subregion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_subregion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cities_subregion_id_seq OWNED BY public.cities_subregion.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_flatpage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_flatpage (
    id integer NOT NULL,
    url character varying(100) NOT NULL,
    title character varying(200) NOT NULL,
    content text NOT NULL,
    enable_comments boolean NOT NULL,
    template_name character varying(70) NOT NULL,
    registration_required boolean NOT NULL
);


--
-- Name: django_flatpage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_flatpage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_flatpage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_flatpage_id_seq OWNED BY public.django_flatpage.id;


--
-- Name: django_flatpage_sites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_flatpage_sites (
    id integer NOT NULL,
    flatpage_id integer NOT NULL,
    site_id integer NOT NULL
);


--
-- Name: django_flatpage_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_flatpage_sites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_flatpage_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_flatpage_sites_id_seq OWNED BY public.django_flatpage_sites.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


--
-- Name: django_site; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: django_summernote_attachment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.django_summernote_attachment (
    id integer NOT NULL,
    name character varying(255),
    file character varying(100) NOT NULL,
    uploaded timestamp with time zone NOT NULL
);


--
-- Name: django_summernote_attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.django_summernote_attachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_summernote_attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.django_summernote_attachment_id_seq OWNED BY public.django_summernote_attachment.id;


--
-- Name: easy_thumbnails_source; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.easy_thumbnails_source (
    id integer NOT NULL,
    storage_hash character varying(40) NOT NULL,
    name character varying(255) NOT NULL,
    modified timestamp with time zone NOT NULL
);


--
-- Name: easy_thumbnails_source_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.easy_thumbnails_source_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: easy_thumbnails_source_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.easy_thumbnails_source_id_seq OWNED BY public.easy_thumbnails_source.id;


--
-- Name: easy_thumbnails_thumbnail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.easy_thumbnails_thumbnail (
    id integer NOT NULL,
    storage_hash character varying(40) NOT NULL,
    name character varying(255) NOT NULL,
    modified timestamp with time zone NOT NULL,
    source_id integer NOT NULL
);


--
-- Name: easy_thumbnails_thumbnail_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.easy_thumbnails_thumbnail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: easy_thumbnails_thumbnail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.easy_thumbnails_thumbnail_id_seq OWNED BY public.easy_thumbnails_thumbnail.id;


--
-- Name: easy_thumbnails_thumbnaildimensions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.easy_thumbnails_thumbnaildimensions (
    id integer NOT NULL,
    thumbnail_id integer NOT NULL,
    width integer,
    height integer,
    CONSTRAINT easy_thumbnails_thumbnaildimensions_height_check CHECK ((height >= 0)),
    CONSTRAINT easy_thumbnails_thumbnaildimensions_width_check CHECK ((width >= 0))
);


--
-- Name: easy_thumbnails_thumbnaildimensions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.easy_thumbnails_thumbnaildimensions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: easy_thumbnails_thumbnaildimensions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.easy_thumbnails_thumbnaildimensions_id_seq OWNED BY public.easy_thumbnails_thumbnaildimensions.id;


--
-- Name: essentials_dataprivacysetting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.essentials_dataprivacysetting (
    id integer NOT NULL,
    object_id integer NOT NULL,
    attribute character varying(20) NOT NULL,
    setting character varying(1) NOT NULL,
    content_type_id integer NOT NULL,
    CONSTRAINT essentials_dataprivacysetting_object_id_check CHECK ((object_id >= 0))
);


--
-- Name: essentials_dataprivacysetting_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.essentials_dataprivacysetting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: essentials_dataprivacysetting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.essentials_dataprivacysetting_id_seq OWNED BY public.essentials_dataprivacysetting.id;


--
-- Name: essentials_notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.essentials_notification (
    id integer NOT NULL,
    notification_type character varying(3) NOT NULL,
    data jsonb NOT NULL,
    landing_url character varying(200),
    deleted timestamp with time zone,
    notified boolean NOT NULL,
    update_time timestamp with time zone NOT NULL,
    create_time timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: essentials_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.essentials_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: essentials_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.essentials_notification_id_seq OWNED BY public.essentials_notification.id;


--
-- Name: essentials_policy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.essentials_policy (
    id integer NOT NULL,
    version character varying(20) NOT NULL,
    verbose_name character varying(100) NOT NULL,
    code_name character varying(20) NOT NULL,
    doc character varying(100) NOT NULL,
    html text NOT NULL,
    status character varying(1) NOT NULL,
    meta jsonb,
    updated_on timestamp with time zone NOT NULL,
    created_on timestamp with time zone NOT NULL,
    parent_policy_id integer
);


--
-- Name: essentials_policy_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.essentials_policy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: essentials_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.essentials_policy_id_seq OWNED BY public.essentials_policy.id;


--
-- Name: home_owner_homeownerprofile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_owner_homeownerprofile (
    id integer NOT NULL,
    account_id character varying(64),
    user_id integer NOT NULL
);


--
-- Name: home_owner_homeownerprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.home_owner_homeownerprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: home_owner_homeownerprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.home_owner_homeownerprofile_id_seq OWNED BY public.home_owner_homeownerprofile.id;


--
-- Name: home_owner_homeownerprofile_shortlist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_owner_homeownerprofile_shortlist (
    id integer NOT NULL,
    homeownerprofile_id integer NOT NULL,
    housepreference_id integer NOT NULL
);


--
-- Name: home_owner_homeownerprofile_shortlist_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.home_owner_homeownerprofile_shortlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: home_owner_homeownerprofile_shortlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.home_owner_homeownerprofile_shortlist_id_seq OWNED BY public.home_owner_homeownerprofile_shortlist.id;


--
-- Name: house_application; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_application (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    house_meta jsonb,
    tenant_meta jsonb,
    rent integer NOT NULL,
    meta jsonb,
    date daterange NOT NULL,
    status character varying(1) NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    fee_id integer NOT NULL,
    house_id integer NOT NULL,
    tenant_id integer NOT NULL,
    CONSTRAINT house_application_rent_check CHECK ((rent >= 0))
);


--
-- Name: house_application_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_application_id_seq OWNED BY public.house_application.id;


--
-- Name: house_applicationstate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_applicationstate (
    id integer NOT NULL,
    old_state character varying(1) NOT NULL,
    new_state character varying(1) NOT NULL,
    created_on timestamp with time zone NOT NULL,
    actor_id integer
);


--
-- Name: house_applicationstate_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_applicationstate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_applicationstate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_applicationstate_id_seq OWNED BY public.house_applicationstate.id;


--
-- Name: house_availability; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_availability (
    id integer NOT NULL,
    dates daterange NOT NULL,
    periodic boolean NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    house_id integer NOT NULL
);


--
-- Name: house_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_availability_id_seq OWNED BY public.house_availability.id;


--
-- Name: house_cancellationpolicy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_cancellationpolicy (
    id integer NOT NULL,
    "verbose" text NOT NULL,
    description text NOT NULL,
    properties jsonb NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    official_policy_id integer
);


--
-- Name: house_cancellationpolicy_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_cancellationpolicy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_cancellationpolicy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_cancellationpolicy_id_seq OWNED BY public.house_cancellationpolicy.id;


--
-- Name: house_facility; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_facility (
    id integer NOT NULL,
    "verbose" character varying(50) NOT NULL,
    system_default boolean NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL
);


--
-- Name: house_facility_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_facility_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_facility_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_facility_id_seq OWNED BY public.house_facility.id;


--
-- Name: house_hometype; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_hometype (
    id integer NOT NULL,
    name text NOT NULL,
    space_style character varying(1) NOT NULL
);


--
-- Name: house_hometype_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_hometype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_hometype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_hometype_id_seq OWNED BY public.house_hometype.id;


--
-- Name: house_house; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_house (
    id integer NOT NULL,
    title character varying(250) NOT NULL,
    furnished character varying(1) NOT NULL,
    address_hidden text NOT NULL,
    address text NOT NULL,
    bedrooms smallint,
    bathrooms smallint,
    parking smallint,
    rent smallint,
    min_stay smallint,
    max_stay smallint,
    max_people_allowed smallint,
    other_rules text NOT NULL,
    other_people_description text NOT NULL,
    access_restrictions text NOT NULL,
    neighbourhood_description text NOT NULL,
    status character varying(1) NOT NULL,
    uuid uuid NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    cancellation_policy_id integer,
    home_owner_id integer NOT NULL,
    home_type_id integer,
    location_id integer,
    description text,
    CONSTRAINT house_house_bathrooms_check CHECK ((bathrooms >= 0)),
    CONSTRAINT house_house_bedrooms_check CHECK ((bedrooms >= 0)),
    CONSTRAINT house_house_max_people_allowed_check CHECK ((max_people_allowed >= 0)),
    CONSTRAINT house_house_max_stay_check CHECK ((max_stay >= 0)),
    CONSTRAINT house_house_min_stay_check CHECK ((min_stay >= 0)),
    CONSTRAINT house_house_parking_check CHECK ((parking >= 0)),
    CONSTRAINT house_house_rent_check CHECK ((rent >= 0))
);


--
-- Name: house_house_facilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_house_facilities (
    id integer NOT NULL,
    house_id integer NOT NULL,
    facility_id integer NOT NULL
);


--
-- Name: house_house_facilities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_house_facilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_house_facilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_house_facilities_id_seq OWNED BY public.house_house_facilities.id;


--
-- Name: house_house_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_house_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_house_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_house_id_seq OWNED BY public.house_house.id;


--
-- Name: house_house_neighbourhood_facilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_house_neighbourhood_facilities (
    id integer NOT NULL,
    house_id integer NOT NULL,
    neighbourhooddescriptor_id integer NOT NULL
);


--
-- Name: house_house_neighbourhood_facilities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_house_neighbourhood_facilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_house_neighbourhood_facilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_house_neighbourhood_facilities_id_seq OWNED BY public.house_house_neighbourhood_facilities.id;


--
-- Name: house_house_welcome_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_house_welcome_tags (
    id integer NOT NULL,
    house_id integer NOT NULL,
    welcometag_id integer NOT NULL
);


--
-- Name: house_house_welcome_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_house_welcome_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_house_welcome_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_house_welcome_tags_id_seq OWNED BY public.house_house_welcome_tags.id;


--
-- Name: house_houseprofile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_houseprofile (
    id integer NOT NULL,
    priority smallint NOT NULL,
    house_id integer NOT NULL,
    CONSTRAINT house_houseprofile_priority_check CHECK ((priority >= 0))
);


--
-- Name: house_houseprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_houseprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_houseprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_houseprofile_id_seq OWNED BY public.house_houseprofile.id;


--
-- Name: house_houserule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_houserule (
    id integer NOT NULL,
    value character varying(50) NOT NULL,
    comment text NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    house_id integer NOT NULL,
    rule_id integer NOT NULL
);


--
-- Name: house_houserule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_houserule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_houserule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_houserule_id_seq OWNED BY public.house_houserule.id;


--
-- Name: house_image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_image (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    image character varying(100) NOT NULL,
    is_thumbnail boolean NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    house_id integer NOT NULL
);


--
-- Name: house_image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_image_id_seq OWNED BY public.house_image.id;


--
-- Name: house_neighbourhooddescriptor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_neighbourhooddescriptor (
    id integer NOT NULL,
    "verbose" character varying(50) NOT NULL,
    system_default boolean NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL
);


--
-- Name: house_neighbourhooddescriptor_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_neighbourhooddescriptor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_neighbourhooddescriptor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_neighbourhooddescriptor_id_seq OWNED BY public.house_neighbourhooddescriptor.id;


--
-- Name: house_rule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_rule (
    id integer NOT NULL,
    "verbose" character varying(50) NOT NULL,
    options character varying(50)[] NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL
);


--
-- Name: house_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_rule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_rule_id_seq OWNED BY public.house_rule.id;


--
-- Name: house_welcometag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.house_welcometag (
    id integer NOT NULL,
    "verbose" character varying(50) NOT NULL,
    system_default boolean NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL
);


--
-- Name: house_welcometag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.house_welcometag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: house_welcometag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.house_welcometag_id_seq OWNED BY public.house_welcometag.id;


--
-- Name: messaging_message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messaging_message (
    id integer NOT NULL,
    content text NOT NULL,
    send_time timestamp with time zone NOT NULL,
    thread_id integer NOT NULL
);


--
-- Name: messaging_message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messaging_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messaging_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messaging_message_id_seq OWNED BY public.messaging_message.id;


--
-- Name: messaging_thread; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messaging_thread (
    id integer NOT NULL,
    object_id integer NOT NULL,
    uuid uuid NOT NULL,
    content_type_id integer NOT NULL,
    creator_id integer,
    CONSTRAINT messaging_thread_object_id_check CHECK ((object_id >= 0))
);


--
-- Name: messaging_thread_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messaging_thread_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messaging_thread_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messaging_thread_id_seq OWNED BY public.messaging_thread.id;


--
-- Name: messaging_threaduser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messaging_threaduser (
    id integer NOT NULL,
    thread_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: messaging_threaduser_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messaging_threaduser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messaging_threaduser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messaging_threaduser_id_seq OWNED BY public.messaging_threaduser.id;


--
-- Name: messaging_threadusermessage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messaging_threadusermessage (
    id integer NOT NULL,
    read_at timestamp with time zone,
    sender boolean NOT NULL,
    message_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: messaging_threadusermessage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messaging_threadusermessage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messaging_threadusermessage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messaging_threadusermessage_id_seq OWNED BY public.messaging_threadusermessage.id;


--
-- Name: socialaccount_socialaccount; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.socialaccount_socialaccount (
    id integer NOT NULL,
    provider character varying(30) NOT NULL,
    uid character varying(191) NOT NULL,
    last_login timestamp with time zone NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    extra_data text NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.socialaccount_socialaccount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.socialaccount_socialaccount_id_seq OWNED BY public.socialaccount_socialaccount.id;


--
-- Name: socialaccount_socialapp; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.socialaccount_socialapp (
    id integer NOT NULL,
    provider character varying(30) NOT NULL,
    name character varying(40) NOT NULL,
    client_id character varying(191) NOT NULL,
    secret character varying(191) NOT NULL,
    key character varying(191) NOT NULL
);


--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.socialaccount_socialapp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.socialaccount_socialapp_id_seq OWNED BY public.socialaccount_socialapp.id;


--
-- Name: socialaccount_socialapp_sites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.socialaccount_socialapp_sites (
    id integer NOT NULL,
    socialapp_id integer NOT NULL,
    site_id integer NOT NULL
);


--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.socialaccount_socialapp_sites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.socialaccount_socialapp_sites_id_seq OWNED BY public.socialaccount_socialapp_sites.id;


--
-- Name: socialaccount_socialtoken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.socialaccount_socialtoken (
    id integer NOT NULL,
    token text NOT NULL,
    token_secret text NOT NULL,
    expires_at timestamp with time zone,
    account_id integer NOT NULL,
    app_id integer NOT NULL
);


--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.socialaccount_socialtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.socialaccount_socialtoken_id_seq OWNED BY public.socialaccount_socialtoken.id;


--
-- Name: tenant_additionaltenant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_additionaltenant (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    contact_num character varying(15) NOT NULL,
    sex character varying(1) NOT NULL,
    dob date,
    house_pref_id integer NOT NULL
);


--
-- Name: tenant_additionaltenant_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenant_additionaltenant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenant_additionaltenant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenant_additionaltenant_id_seq OWNED BY public.tenant_additionaltenant.id;


--
-- Name: tenant_housepreference; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_housepreference (
    id integer NOT NULL,
    max_budget integer NOT NULL,
    move_in_date daterange,
    move_out_date daterange,
    uuid uuid NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL,
    description text NOT NULL,
    status character varying(1) NOT NULL,
    home_type_id integer,
    tenant_id integer NOT NULL,
    CONSTRAINT tenant_housepreference_max_budget_check CHECK ((max_budget >= 0))
);


--
-- Name: tenant_housepreference_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenant_housepreference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenant_housepreference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenant_housepreference_id_seq OWNED BY public.tenant_housepreference.id;


--
-- Name: tenant_housepreference_locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_housepreference_locations (
    id integer NOT NULL,
    housepreference_id integer NOT NULL,
    city_id integer NOT NULL
);


--
-- Name: tenant_housepreference_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenant_housepreference_locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenant_housepreference_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenant_housepreference_locations_id_seq OWNED BY public.tenant_housepreference_locations.id;


--
-- Name: tenant_tenantprofile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_tenantprofile (
    id integer NOT NULL,
    customer_id character varying(64),
    user_id integer NOT NULL
);


--
-- Name: tenant_tenantprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenant_tenantprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenant_tenantprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenant_tenantprofile_id_seq OWNED BY public.tenant_tenantprofile.id;


--
-- Name: tenant_tenantprofile_shortlist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_tenantprofile_shortlist (
    id integer NOT NULL,
    tenantprofile_id integer NOT NULL,
    house_id integer NOT NULL
);


--
-- Name: tenant_tenantprofile_shortlist_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenant_tenantprofile_shortlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenant_tenantprofile_shortlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenant_tenantprofile_shortlist_id_seq OWNED BY public.tenant_tenantprofile_shortlist.id;


--
-- Name: user_custom_personalitytag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_custom_personalitytag (
    id integer NOT NULL,
    "verbose" character varying(50) NOT NULL,
    system_default boolean NOT NULL,
    created_on timestamp with time zone NOT NULL,
    updated_on timestamp with time zone NOT NULL
);


--
-- Name: user_custom_personalitytag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_custom_personalitytag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_custom_personalitytag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_custom_personalitytag_id_seq OWNED BY public.user_custom_personalitytag.id;


--
-- Name: user_custom_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_custom_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL
);


--
-- Name: user_custom_user_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_custom_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


--
-- Name: user_custom_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_custom_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_custom_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_custom_user_groups_id_seq OWNED BY public.user_custom_user_groups.id;


--
-- Name: user_custom_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_custom_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_custom_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_custom_user_id_seq OWNED BY public.user_custom_user.id;


--
-- Name: user_custom_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_custom_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


--
-- Name: user_custom_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_custom_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_custom_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_custom_user_user_permissions_id_seq OWNED BY public.user_custom_user_user_permissions.id;


--
-- Name: user_custom_userprofile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_custom_userprofile (
    id integer NOT NULL,
    contact_num character varying(15) NOT NULL,
    sex character varying(1) NOT NULL,
    dob date,
    receive_newsletter boolean NOT NULL,
    profile_pic character varying(100),
    updated_on timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: user_custom_userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_custom_userprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_custom_userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_custom_userprofile_id_seq OWNED BY public.user_custom_userprofile.id;


--
-- Name: user_custom_userprofile_personality_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_custom_userprofile_personality_tags (
    id integer NOT NULL,
    userprofile_id integer NOT NULL,
    personalitytag_id integer NOT NULL
);


--
-- Name: user_custom_userprofile_personality_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_custom_userprofile_personality_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_custom_userprofile_personality_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_custom_userprofile_personality_tags_id_seq OWNED BY public.user_custom_userprofile_personality_tags.id;


--
-- Name: account_emailaddress id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailaddress ALTER COLUMN id SET DEFAULT nextval('public.account_emailaddress_id_seq'::regclass);


--
-- Name: account_emailconfirmation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailconfirmation ALTER COLUMN id SET DEFAULT nextval('public.account_emailconfirmation_id_seq'::regclass);


--
-- Name: admin_custom_activitylog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_custom_activitylog ALTER COLUMN id SET DEFAULT nextval('public.admin_custom_activitylog_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: billing_fee id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_fee ALTER COLUMN id SET DEFAULT nextval('public.billing_fee_id_seq'::regclass);


--
-- Name: billing_order id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_order ALTER COLUMN id SET DEFAULT nextval('public.billing_order_id_seq'::regclass);


--
-- Name: blog_article id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_article ALTER COLUMN id SET DEFAULT nextval('public.blog_article_id_seq'::regclass);


--
-- Name: cities_alternativename id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_alternativename ALTER COLUMN id SET DEFAULT nextval('public.cities_alternativename_id_seq'::regclass);


--
-- Name: cities_city id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city ALTER COLUMN id SET DEFAULT nextval('public.cities_city_id_seq'::regclass);


--
-- Name: cities_city_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_city_alt_names_id_seq'::regclass);


--
-- Name: cities_continent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent ALTER COLUMN id SET DEFAULT nextval('public.cities_continent_id_seq'::regclass);


--
-- Name: cities_continent_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_continent_alt_names_id_seq'::regclass);


--
-- Name: cities_country id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country ALTER COLUMN id SET DEFAULT nextval('public.cities_country_id_seq'::regclass);


--
-- Name: cities_country_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_country_alt_names_id_seq'::regclass);


--
-- Name: cities_country_neighbours id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_neighbours ALTER COLUMN id SET DEFAULT nextval('public.cities_country_neighbours_id_seq'::regclass);


--
-- Name: cities_district id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district ALTER COLUMN id SET DEFAULT nextval('public.cities_district_id_seq'::regclass);


--
-- Name: cities_district_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_district_alt_names_id_seq'::regclass);


--
-- Name: cities_postalcode id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode ALTER COLUMN id SET DEFAULT nextval('public.cities_postalcode_id_seq'::regclass);


--
-- Name: cities_postalcode_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_postalcode_alt_names_id_seq'::regclass);


--
-- Name: cities_region id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region ALTER COLUMN id SET DEFAULT nextval('public.cities_region_id_seq'::regclass);


--
-- Name: cities_region_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_region_alt_names_id_seq'::regclass);


--
-- Name: cities_subregion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion ALTER COLUMN id SET DEFAULT nextval('public.cities_subregion_id_seq'::regclass);


--
-- Name: cities_subregion_alt_names id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion_alt_names ALTER COLUMN id SET DEFAULT nextval('public.cities_subregion_alt_names_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_flatpage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage ALTER COLUMN id SET DEFAULT nextval('public.django_flatpage_id_seq'::regclass);


--
-- Name: django_flatpage_sites id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage_sites ALTER COLUMN id SET DEFAULT nextval('public.django_flatpage_sites_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_site id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: django_summernote_attachment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_summernote_attachment ALTER COLUMN id SET DEFAULT nextval('public.django_summernote_attachment_id_seq'::regclass);


--
-- Name: easy_thumbnails_source id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_source ALTER COLUMN id SET DEFAULT nextval('public.easy_thumbnails_source_id_seq'::regclass);


--
-- Name: easy_thumbnails_thumbnail id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnail ALTER COLUMN id SET DEFAULT nextval('public.easy_thumbnails_thumbnail_id_seq'::regclass);


--
-- Name: easy_thumbnails_thumbnaildimensions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnaildimensions ALTER COLUMN id SET DEFAULT nextval('public.easy_thumbnails_thumbnaildimensions_id_seq'::regclass);


--
-- Name: essentials_dataprivacysetting id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_dataprivacysetting ALTER COLUMN id SET DEFAULT nextval('public.essentials_dataprivacysetting_id_seq'::regclass);


--
-- Name: essentials_notification id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_notification ALTER COLUMN id SET DEFAULT nextval('public.essentials_notification_id_seq'::regclass);


--
-- Name: essentials_policy id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_policy ALTER COLUMN id SET DEFAULT nextval('public.essentials_policy_id_seq'::regclass);


--
-- Name: home_owner_homeownerprofile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile ALTER COLUMN id SET DEFAULT nextval('public.home_owner_homeownerprofile_id_seq'::regclass);


--
-- Name: home_owner_homeownerprofile_shortlist id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile_shortlist ALTER COLUMN id SET DEFAULT nextval('public.home_owner_homeownerprofile_shortlist_id_seq'::regclass);


--
-- Name: house_application id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application ALTER COLUMN id SET DEFAULT nextval('public.house_application_id_seq'::regclass);


--
-- Name: house_applicationstate id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_applicationstate ALTER COLUMN id SET DEFAULT nextval('public.house_applicationstate_id_seq'::regclass);


--
-- Name: house_availability id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_availability ALTER COLUMN id SET DEFAULT nextval('public.house_availability_id_seq'::regclass);


--
-- Name: house_cancellationpolicy id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_cancellationpolicy ALTER COLUMN id SET DEFAULT nextval('public.house_cancellationpolicy_id_seq'::regclass);


--
-- Name: house_facility id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_facility ALTER COLUMN id SET DEFAULT nextval('public.house_facility_id_seq'::regclass);


--
-- Name: house_hometype id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_hometype ALTER COLUMN id SET DEFAULT nextval('public.house_hometype_id_seq'::regclass);


--
-- Name: house_house id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house ALTER COLUMN id SET DEFAULT nextval('public.house_house_id_seq'::regclass);


--
-- Name: house_house_facilities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_facilities ALTER COLUMN id SET DEFAULT nextval('public.house_house_facilities_id_seq'::regclass);


--
-- Name: house_house_neighbourhood_facilities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_neighbourhood_facilities ALTER COLUMN id SET DEFAULT nextval('public.house_house_neighbourhood_facilities_id_seq'::regclass);


--
-- Name: house_house_welcome_tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_welcome_tags ALTER COLUMN id SET DEFAULT nextval('public.house_house_welcome_tags_id_seq'::regclass);


--
-- Name: house_houseprofile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houseprofile ALTER COLUMN id SET DEFAULT nextval('public.house_houseprofile_id_seq'::regclass);


--
-- Name: house_houserule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houserule ALTER COLUMN id SET DEFAULT nextval('public.house_houserule_id_seq'::regclass);


--
-- Name: house_image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_image ALTER COLUMN id SET DEFAULT nextval('public.house_image_id_seq'::regclass);


--
-- Name: house_neighbourhooddescriptor id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_neighbourhooddescriptor ALTER COLUMN id SET DEFAULT nextval('public.house_neighbourhooddescriptor_id_seq'::regclass);


--
-- Name: house_rule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_rule ALTER COLUMN id SET DEFAULT nextval('public.house_rule_id_seq'::regclass);


--
-- Name: house_welcometag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_welcometag ALTER COLUMN id SET DEFAULT nextval('public.house_welcometag_id_seq'::regclass);


--
-- Name: messaging_message id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_message ALTER COLUMN id SET DEFAULT nextval('public.messaging_message_id_seq'::regclass);


--
-- Name: messaging_thread id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_thread ALTER COLUMN id SET DEFAULT nextval('public.messaging_thread_id_seq'::regclass);


--
-- Name: messaging_threaduser id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threaduser ALTER COLUMN id SET DEFAULT nextval('public.messaging_threaduser_id_seq'::regclass);


--
-- Name: messaging_threadusermessage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threadusermessage ALTER COLUMN id SET DEFAULT nextval('public.messaging_threadusermessage_id_seq'::regclass);


--
-- Name: socialaccount_socialaccount id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialaccount ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialaccount_id_seq'::regclass);


--
-- Name: socialaccount_socialapp id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialapp_id_seq'::regclass);


--
-- Name: socialaccount_socialapp_sites id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialapp_sites_id_seq'::regclass);


--
-- Name: socialaccount_socialtoken id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialtoken ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialtoken_id_seq'::regclass);


--
-- Name: tenant_additionaltenant id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_additionaltenant ALTER COLUMN id SET DEFAULT nextval('public.tenant_additionaltenant_id_seq'::regclass);


--
-- Name: tenant_housepreference id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference ALTER COLUMN id SET DEFAULT nextval('public.tenant_housepreference_id_seq'::regclass);


--
-- Name: tenant_housepreference_locations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference_locations ALTER COLUMN id SET DEFAULT nextval('public.tenant_housepreference_locations_id_seq'::regclass);


--
-- Name: tenant_tenantprofile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile ALTER COLUMN id SET DEFAULT nextval('public.tenant_tenantprofile_id_seq'::regclass);


--
-- Name: tenant_tenantprofile_shortlist id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile_shortlist ALTER COLUMN id SET DEFAULT nextval('public.tenant_tenantprofile_shortlist_id_seq'::regclass);


--
-- Name: user_custom_personalitytag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_personalitytag ALTER COLUMN id SET DEFAULT nextval('public.user_custom_personalitytag_id_seq'::regclass);


--
-- Name: user_custom_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user ALTER COLUMN id SET DEFAULT nextval('public.user_custom_user_id_seq'::regclass);


--
-- Name: user_custom_user_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_groups ALTER COLUMN id SET DEFAULT nextval('public.user_custom_user_groups_id_seq'::regclass);


--
-- Name: user_custom_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.user_custom_user_user_permissions_id_seq'::regclass);


--
-- Name: user_custom_userprofile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile ALTER COLUMN id SET DEFAULT nextval('public.user_custom_userprofile_id_seq'::regclass);


--
-- Name: user_custom_userprofile_personality_tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile_personality_tags ALTER COLUMN id SET DEFAULT nextval('public.user_custom_userprofile_personality_tags_id_seq'::regclass);


--
-- Name: account_emailaddress account_emailaddress_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_email_key UNIQUE (email);


--
-- Name: account_emailaddress account_emailaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_pkey PRIMARY KEY (id);


--
-- Name: account_emailconfirmation account_emailconfirmation_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_key_key UNIQUE (key);


--
-- Name: account_emailconfirmation account_emailconfirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_pkey PRIMARY KEY (id);


--
-- Name: admin_custom_activitylog admin_custom_activitylog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_custom_activitylog
    ADD CONSTRAINT admin_custom_activitylog_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: billing_fee billing_fee_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_fee
    ADD CONSTRAINT billing_fee_pkey PRIMARY KEY (id);


--
-- Name: billing_order billing_order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_order
    ADD CONSTRAINT billing_order_pkey PRIMARY KEY (id);


--
-- Name: blog_article blog_article_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_article
    ADD CONSTRAINT blog_article_pkey PRIMARY KEY (id);


--
-- Name: blog_article blog_article_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_article
    ADD CONSTRAINT blog_article_slug_key UNIQUE (slug);


--
-- Name: cities_alternativename cities_alternativename_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_alternativename
    ADD CONSTRAINT cities_alternativename_pkey PRIMARY KEY (id);


--
-- Name: cities_city_alt_names cities_city_alt_names_city_id_alternativename_id_3bbe95e6_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city_alt_names
    ADD CONSTRAINT cities_city_alt_names_city_id_alternativename_id_3bbe95e6_uniq UNIQUE (city_id, alternativename_id);


--
-- Name: cities_city_alt_names cities_city_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city_alt_names
    ADD CONSTRAINT cities_city_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_city cities_city_country_id_region_id_sub_2f07e352_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city
    ADD CONSTRAINT cities_city_country_id_region_id_sub_2f07e352_uniq UNIQUE (country_id, region_id, subregion_id, id, name);


--
-- Name: cities_city cities_city_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city
    ADD CONSTRAINT cities_city_pkey PRIMARY KEY (id);


--
-- Name: cities_continent_alt_names cities_continent_alt_nam_continent_id_alternative_c239220b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent_alt_names
    ADD CONSTRAINT cities_continent_alt_nam_continent_id_alternative_c239220b_uniq UNIQUE (continent_id, alternativename_id);


--
-- Name: cities_continent_alt_names cities_continent_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent_alt_names
    ADD CONSTRAINT cities_continent_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_continent cities_continent_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent
    ADD CONSTRAINT cities_continent_code_key UNIQUE (code);


--
-- Name: cities_continent cities_continent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent
    ADD CONSTRAINT cities_continent_pkey PRIMARY KEY (id);


--
-- Name: cities_country_alt_names cities_country_alt_names_country_id_alternativena_de89a488_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_alt_names
    ADD CONSTRAINT cities_country_alt_names_country_id_alternativena_de89a488_uniq UNIQUE (country_id, alternativename_id);


--
-- Name: cities_country_alt_names cities_country_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_alt_names
    ADD CONSTRAINT cities_country_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_country cities_country_code3_0e11830f_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country
    ADD CONSTRAINT cities_country_code3_0e11830f_uniq UNIQUE (code3);


--
-- Name: cities_country cities_country_code_449cca50_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country
    ADD CONSTRAINT cities_country_code_449cca50_uniq UNIQUE (code);


--
-- Name: cities_country_neighbours cities_country_neighbour_from_country_id_to_count_fa991d85_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_neighbours
    ADD CONSTRAINT cities_country_neighbour_from_country_id_to_count_fa991d85_uniq UNIQUE (from_country_id, to_country_id);


--
-- Name: cities_country_neighbours cities_country_neighbours_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_neighbours
    ADD CONSTRAINT cities_country_neighbours_pkey PRIMARY KEY (id);


--
-- Name: cities_country cities_country_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country
    ADD CONSTRAINT cities_country_pkey PRIMARY KEY (id);


--
-- Name: cities_district_alt_names cities_district_alt_name_district_id_alternativen_7ac77d4a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district_alt_names
    ADD CONSTRAINT cities_district_alt_name_district_id_alternativen_7ac77d4a_uniq UNIQUE (district_id, alternativename_id);


--
-- Name: cities_district_alt_names cities_district_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district_alt_names
    ADD CONSTRAINT cities_district_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_district cities_district_city_id_name_bc534b79_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district
    ADD CONSTRAINT cities_district_city_id_name_bc534b79_uniq UNIQUE (city_id, name);


--
-- Name: cities_district cities_district_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district
    ADD CONSTRAINT cities_district_pkey PRIMARY KEY (id);


--
-- Name: cities_postalcode_alt_names cities_postalcode_alt_na_postalcode_id_alternativ_401426f8_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode_alt_names
    ADD CONSTRAINT cities_postalcode_alt_na_postalcode_id_alternativ_401426f8_uniq UNIQUE (postalcode_id, alternativename_id);


--
-- Name: cities_postalcode_alt_names cities_postalcode_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode_alt_names
    ADD CONSTRAINT cities_postalcode_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_postalcode cities_postalcode_country_id_region_id_sub_1c51a75a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_country_id_region_id_sub_1c51a75a_uniq UNIQUE (country_id, region_id, subregion_id, city_id, district_id, name, id, code);


--
-- Name: cities_postalcode cities_postalcode_country_id_region_name_s_f0fe1368_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_country_id_region_name_s_f0fe1368_uniq UNIQUE (country_id, region_name, subregion_name, district_name, name, id, code);


--
-- Name: cities_postalcode cities_postalcode_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_pkey PRIMARY KEY (id);


--
-- Name: cities_region_alt_names cities_region_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region_alt_names
    ADD CONSTRAINT cities_region_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_region_alt_names cities_region_alt_names_region_id_alternativenam_1a026036_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region_alt_names
    ADD CONSTRAINT cities_region_alt_names_region_id_alternativenam_1a026036_uniq UNIQUE (region_id, alternativename_id);


--
-- Name: cities_region cities_region_country_id_name_d9299b49_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region
    ADD CONSTRAINT cities_region_country_id_name_d9299b49_uniq UNIQUE (country_id, name);


--
-- Name: cities_region cities_region_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region
    ADD CONSTRAINT cities_region_pkey PRIMARY KEY (id);


--
-- Name: cities_subregion_alt_names cities_subregion_alt_nam_subregion_id_alternative_85ce18ba_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion_alt_names
    ADD CONSTRAINT cities_subregion_alt_nam_subregion_id_alternative_85ce18ba_uniq UNIQUE (subregion_id, alternativename_id);


--
-- Name: cities_subregion_alt_names cities_subregion_alt_names_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion_alt_names
    ADD CONSTRAINT cities_subregion_alt_names_pkey PRIMARY KEY (id);


--
-- Name: cities_subregion cities_subregion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion
    ADD CONSTRAINT cities_subregion_pkey PRIMARY KEY (id);


--
-- Name: cities_subregion cities_subregion_region_id_id_name_2591f542_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion
    ADD CONSTRAINT cities_subregion_region_id_id_name_2591f542_uniq UNIQUE (region_id, id, name);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_flatpage django_flatpage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage
    ADD CONSTRAINT django_flatpage_pkey PRIMARY KEY (id);


--
-- Name: django_flatpage_sites django_flatpage_sites_flatpage_id_site_id_0d29d9d1_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage_sites
    ADD CONSTRAINT django_flatpage_sites_flatpage_id_site_id_0d29d9d1_uniq UNIQUE (flatpage_id, site_id);


--
-- Name: django_flatpage_sites django_flatpage_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage_sites
    ADD CONSTRAINT django_flatpage_sites_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: django_summernote_attachment django_summernote_attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_summernote_attachment
    ADD CONSTRAINT django_summernote_attachment_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_source easy_thumbnails_source_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_source
    ADD CONSTRAINT easy_thumbnails_source_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_source easy_thumbnails_source_storage_hash_name_481ce32d_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_source
    ADD CONSTRAINT easy_thumbnails_source_storage_hash_name_481ce32d_uniq UNIQUE (storage_hash, name);


--
-- Name: easy_thumbnails_thumbnail easy_thumbnails_thumbnai_storage_hash_name_source_fb375270_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnail
    ADD CONSTRAINT easy_thumbnails_thumbnai_storage_hash_name_source_fb375270_uniq UNIQUE (storage_hash, name, source_id);


--
-- Name: easy_thumbnails_thumbnail easy_thumbnails_thumbnail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnail
    ADD CONSTRAINT easy_thumbnails_thumbnail_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_thumbnaildimensions easy_thumbnails_thumbnaildimensions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnaildimensions
    ADD CONSTRAINT easy_thumbnails_thumbnaildimensions_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_thumbnaildimensions easy_thumbnails_thumbnaildimensions_thumbnail_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnaildimensions
    ADD CONSTRAINT easy_thumbnails_thumbnaildimensions_thumbnail_id_key UNIQUE (thumbnail_id);


--
-- Name: essentials_dataprivacysetting essentials_dataprivacyse_content_type_id_object_i_5dab7021_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_dataprivacysetting
    ADD CONSTRAINT essentials_dataprivacyse_content_type_id_object_i_5dab7021_uniq UNIQUE (content_type_id, object_id, attribute);


--
-- Name: essentials_dataprivacysetting essentials_dataprivacysetting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_dataprivacysetting
    ADD CONSTRAINT essentials_dataprivacysetting_pkey PRIMARY KEY (id);


--
-- Name: essentials_notification essentials_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_notification
    ADD CONSTRAINT essentials_notification_pkey PRIMARY KEY (id);


--
-- Name: essentials_policy essentials_policy_parent_policy_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_policy
    ADD CONSTRAINT essentials_policy_parent_policy_id_key UNIQUE (parent_policy_id);


--
-- Name: essentials_policy essentials_policy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_policy
    ADD CONSTRAINT essentials_policy_pkey PRIMARY KEY (id);


--
-- Name: essentials_policy essentials_policy_version_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_policy
    ADD CONSTRAINT essentials_policy_version_key UNIQUE (version);


--
-- Name: home_owner_homeownerprofile_shortlist home_owner_homeownerprof_homeownerprofile_id_hous_11247070_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile_shortlist
    ADD CONSTRAINT home_owner_homeownerprof_homeownerprofile_id_hous_11247070_uniq UNIQUE (homeownerprofile_id, housepreference_id);


--
-- Name: home_owner_homeownerprofile home_owner_homeownerprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile
    ADD CONSTRAINT home_owner_homeownerprofile_pkey PRIMARY KEY (id);


--
-- Name: home_owner_homeownerprofile_shortlist home_owner_homeownerprofile_shortlist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile_shortlist
    ADD CONSTRAINT home_owner_homeownerprofile_shortlist_pkey PRIMARY KEY (id);


--
-- Name: home_owner_homeownerprofile home_owner_homeownerprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile
    ADD CONSTRAINT home_owner_homeownerprofile_user_id_key UNIQUE (user_id);


--
-- Name: house_application house_application_house_id_tenant_id_7878a66f_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application
    ADD CONSTRAINT house_application_house_id_tenant_id_7878a66f_uniq UNIQUE (house_id, tenant_id);


--
-- Name: house_application house_application_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application
    ADD CONSTRAINT house_application_pkey PRIMARY KEY (id);


--
-- Name: house_application house_application_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application
    ADD CONSTRAINT house_application_uuid_key UNIQUE (uuid);


--
-- Name: house_applicationstate house_applicationstate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_applicationstate
    ADD CONSTRAINT house_applicationstate_pkey PRIMARY KEY (id);


--
-- Name: house_availability house_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_availability
    ADD CONSTRAINT house_availability_pkey PRIMARY KEY (id);


--
-- Name: house_cancellationpolicy house_cancellationpolicy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_cancellationpolicy
    ADD CONSTRAINT house_cancellationpolicy_pkey PRIMARY KEY (id);


--
-- Name: house_facility house_facility_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_facility
    ADD CONSTRAINT house_facility_pkey PRIMARY KEY (id);


--
-- Name: house_hometype house_hometype_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_hometype
    ADD CONSTRAINT house_hometype_pkey PRIMARY KEY (id);


--
-- Name: house_house_facilities house_house_facilities_house_id_facility_id_04ed7676_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_facilities
    ADD CONSTRAINT house_house_facilities_house_id_facility_id_04ed7676_uniq UNIQUE (house_id, facility_id);


--
-- Name: house_house_facilities house_house_facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_facilities
    ADD CONSTRAINT house_house_facilities_pkey PRIMARY KEY (id);


--
-- Name: house_house_neighbourhood_facilities house_house_neighbourhoo_house_id_neighbourhoodde_49d06739_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_neighbourhood_facilities
    ADD CONSTRAINT house_house_neighbourhoo_house_id_neighbourhoodde_49d06739_uniq UNIQUE (house_id, neighbourhooddescriptor_id);


--
-- Name: house_house_neighbourhood_facilities house_house_neighbourhood_facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_neighbourhood_facilities
    ADD CONSTRAINT house_house_neighbourhood_facilities_pkey PRIMARY KEY (id);


--
-- Name: house_house house_house_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house
    ADD CONSTRAINT house_house_pkey PRIMARY KEY (id);


--
-- Name: house_house house_house_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house
    ADD CONSTRAINT house_house_uuid_key UNIQUE (uuid);


--
-- Name: house_house_welcome_tags house_house_welcome_tags_house_id_welcometag_id_0f297fbd_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_welcome_tags
    ADD CONSTRAINT house_house_welcome_tags_house_id_welcometag_id_0f297fbd_uniq UNIQUE (house_id, welcometag_id);


--
-- Name: house_house_welcome_tags house_house_welcome_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_welcome_tags
    ADD CONSTRAINT house_house_welcome_tags_pkey PRIMARY KEY (id);


--
-- Name: house_houseprofile house_houseprofile_house_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houseprofile
    ADD CONSTRAINT house_houseprofile_house_id_key UNIQUE (house_id);


--
-- Name: house_houseprofile house_houseprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houseprofile
    ADD CONSTRAINT house_houseprofile_pkey PRIMARY KEY (id);


--
-- Name: house_houserule house_houserule_house_id_rule_id_890b7d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houserule
    ADD CONSTRAINT house_houserule_house_id_rule_id_890b7d3b_uniq UNIQUE (house_id, rule_id);


--
-- Name: house_houserule house_houserule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houserule
    ADD CONSTRAINT house_houserule_pkey PRIMARY KEY (id);


--
-- Name: house_image house_image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_image
    ADD CONSTRAINT house_image_pkey PRIMARY KEY (id);


--
-- Name: house_image house_image_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_image
    ADD CONSTRAINT house_image_uuid_key UNIQUE (uuid);


--
-- Name: house_neighbourhooddescriptor house_neighbourhooddescriptor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_neighbourhooddescriptor
    ADD CONSTRAINT house_neighbourhooddescriptor_pkey PRIMARY KEY (id);


--
-- Name: house_rule house_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_rule
    ADD CONSTRAINT house_rule_pkey PRIMARY KEY (id);


--
-- Name: house_welcometag house_welcometag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_welcometag
    ADD CONSTRAINT house_welcometag_pkey PRIMARY KEY (id);


--
-- Name: messaging_message messaging_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_message
    ADD CONSTRAINT messaging_message_pkey PRIMARY KEY (id);


--
-- Name: messaging_thread messaging_thread_content_type_id_object_i_d456f04d_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_thread
    ADD CONSTRAINT messaging_thread_content_type_id_object_i_d456f04d_uniq UNIQUE (content_type_id, object_id, creator_id);


--
-- Name: messaging_thread messaging_thread_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_thread
    ADD CONSTRAINT messaging_thread_pkey PRIMARY KEY (id);


--
-- Name: messaging_thread messaging_thread_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_thread
    ADD CONSTRAINT messaging_thread_uuid_key UNIQUE (uuid);


--
-- Name: messaging_threaduser messaging_threaduser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threaduser
    ADD CONSTRAINT messaging_threaduser_pkey PRIMARY KEY (id);


--
-- Name: messaging_threaduser messaging_threaduser_thread_id_user_id_5e45d7c1_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threaduser
    ADD CONSTRAINT messaging_threaduser_thread_id_user_id_5e45d7c1_uniq UNIQUE (thread_id, user_id);


--
-- Name: messaging_threadusermessage messaging_threadusermessage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threadusermessage
    ADD CONSTRAINT messaging_threadusermessage_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_provider_uid_fc810c6e_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_provider_uid_fc810c6e_uniq UNIQUE (provider, uid);


--
-- Name: socialaccount_socialapp_sites socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq UNIQUE (socialapp_id, site_id);


--
-- Name: socialaccount_socialapp socialaccount_socialapp_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp
    ADD CONSTRAINT socialaccount_socialapp_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialapp_sites socialaccount_socialapp_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_socialapp_sites_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialtoken socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq UNIQUE (app_id, account_id);


--
-- Name: socialaccount_socialtoken socialaccount_socialtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_socialtoken_pkey PRIMARY KEY (id);


--
-- Name: tenant_additionaltenant tenant_additionaltenant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_additionaltenant
    ADD CONSTRAINT tenant_additionaltenant_pkey PRIMARY KEY (id);


--
-- Name: tenant_housepreference_locations tenant_housepreference_l_housepreference_id_city__f86b3b03_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference_locations
    ADD CONSTRAINT tenant_housepreference_l_housepreference_id_city__f86b3b03_uniq UNIQUE (housepreference_id, city_id);


--
-- Name: tenant_housepreference_locations tenant_housepreference_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference_locations
    ADD CONSTRAINT tenant_housepreference_locations_pkey PRIMARY KEY (id);


--
-- Name: tenant_housepreference tenant_housepreference_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference
    ADD CONSTRAINT tenant_housepreference_pkey PRIMARY KEY (id);


--
-- Name: tenant_housepreference tenant_housepreference_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference
    ADD CONSTRAINT tenant_housepreference_uuid_key UNIQUE (uuid);


--
-- Name: tenant_tenantprofile tenant_tenantprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile
    ADD CONSTRAINT tenant_tenantprofile_pkey PRIMARY KEY (id);


--
-- Name: tenant_tenantprofile_shortlist tenant_tenantprofile_sho_tenantprofile_id_house_i_0e8767d5_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile_shortlist
    ADD CONSTRAINT tenant_tenantprofile_sho_tenantprofile_id_house_i_0e8767d5_uniq UNIQUE (tenantprofile_id, house_id);


--
-- Name: tenant_tenantprofile_shortlist tenant_tenantprofile_shortlist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile_shortlist
    ADD CONSTRAINT tenant_tenantprofile_shortlist_pkey PRIMARY KEY (id);


--
-- Name: tenant_tenantprofile tenant_tenantprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile
    ADD CONSTRAINT tenant_tenantprofile_user_id_key UNIQUE (user_id);


--
-- Name: user_custom_personalitytag user_custom_personalitytag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_personalitytag
    ADD CONSTRAINT user_custom_personalitytag_pkey PRIMARY KEY (id);


--
-- Name: user_custom_user user_custom_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user
    ADD CONSTRAINT user_custom_user_email_key UNIQUE (email);


--
-- Name: user_custom_user_groups user_custom_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_groups
    ADD CONSTRAINT user_custom_user_groups_pkey PRIMARY KEY (id);


--
-- Name: user_custom_user_groups user_custom_user_groups_user_id_group_id_2b346190_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_groups
    ADD CONSTRAINT user_custom_user_groups_user_id_group_id_2b346190_uniq UNIQUE (user_id, group_id);


--
-- Name: user_custom_user user_custom_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user
    ADD CONSTRAINT user_custom_user_pkey PRIMARY KEY (id);


--
-- Name: user_custom_user_user_permissions user_custom_user_user_pe_user_id_permission_id_9c937ceb_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_user_permissions
    ADD CONSTRAINT user_custom_user_user_pe_user_id_permission_id_9c937ceb_uniq UNIQUE (user_id, permission_id);


--
-- Name: user_custom_user_user_permissions user_custom_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_user_permissions
    ADD CONSTRAINT user_custom_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: user_custom_userprofile_personality_tags user_custom_userprofile__userprofile_id_personali_a410b367_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile_personality_tags
    ADD CONSTRAINT user_custom_userprofile__userprofile_id_personali_a410b367_uniq UNIQUE (userprofile_id, personalitytag_id);


--
-- Name: user_custom_userprofile_personality_tags user_custom_userprofile_personality_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile_personality_tags
    ADD CONSTRAINT user_custom_userprofile_personality_tags_pkey PRIMARY KEY (id);


--
-- Name: user_custom_userprofile user_custom_userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile
    ADD CONSTRAINT user_custom_userprofile_pkey PRIMARY KEY (id);


--
-- Name: user_custom_userprofile user_custom_userprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile
    ADD CONSTRAINT user_custom_userprofile_user_id_key UNIQUE (user_id);


--
-- Name: account_emailaddress_email_03be32b2_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX account_emailaddress_email_03be32b2_like ON public.account_emailaddress USING btree (email varchar_pattern_ops);


--
-- Name: account_emailaddress_user_id_2c513194; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX account_emailaddress_user_id_2c513194 ON public.account_emailaddress USING btree (user_id);


--
-- Name: account_emailconfirmation_email_address_id_5b7f8c58; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX account_emailconfirmation_email_address_id_5b7f8c58 ON public.account_emailconfirmation USING btree (email_address_id);


--
-- Name: account_emailconfirmation_key_f43612bd_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX account_emailconfirmation_key_f43612bd_like ON public.account_emailconfirmation USING btree (key varchar_pattern_ops);


--
-- Name: admin_custom_activitylog_actor_id_3326fe58; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX admin_custom_activitylog_actor_id_3326fe58 ON public.admin_custom_activitylog USING btree (actor_id);


--
-- Name: admin_custom_activitylog_content_type_id_dd53992c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX admin_custom_activitylog_content_type_id_dd53992c ON public.admin_custom_activitylog USING btree (content_type_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: billing_order_application_id_b1188680; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX billing_order_application_id_b1188680 ON public.billing_order USING btree (application_id);


--
-- Name: blog_article_slug_c3fca16d_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_article_slug_c3fca16d_like ON public.blog_article USING btree (slug varchar_pattern_ops);


--
-- Name: cities_city_alt_names_alternativename_id_350db157; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_alt_names_alternativename_id_350db157 ON public.cities_city_alt_names USING btree (alternativename_id);


--
-- Name: cities_city_alt_names_city_id_fa972594; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_alt_names_city_id_fa972594 ON public.cities_city_alt_names USING btree (city_id);


--
-- Name: cities_city_country_id_779ae117; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_country_id_779ae117 ON public.cities_city USING btree (country_id);


--
-- Name: cities_city_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_location_id ON public.cities_city USING gist (location);


--
-- Name: cities_city_name_a2d48c76; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_name_a2d48c76 ON public.cities_city USING btree (name);


--
-- Name: cities_city_name_a2d48c76_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_name_a2d48c76_like ON public.cities_city USING btree (name varchar_pattern_ops);


--
-- Name: cities_city_name_std_7913d4ed; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_name_std_7913d4ed ON public.cities_city USING btree (name_std);


--
-- Name: cities_city_name_std_7913d4ed_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_name_std_7913d4ed_like ON public.cities_city USING btree (name_std varchar_pattern_ops);


--
-- Name: cities_city_region_id_0227cdac; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_region_id_0227cdac ON public.cities_city USING btree (region_id);


--
-- Name: cities_city_subregion_id_9fbab97d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_city_subregion_id_9fbab97d ON public.cities_city USING btree (subregion_id);


--
-- Name: cities_continent_alt_names_alternativename_id_711487a6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_continent_alt_names_alternativename_id_711487a6 ON public.cities_continent_alt_names USING btree (alternativename_id);


--
-- Name: cities_continent_alt_names_continent_id_b77e7789; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_continent_alt_names_continent_id_b77e7789 ON public.cities_continent_alt_names USING btree (continent_id);


--
-- Name: cities_continent_code_f1b3a055_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_continent_code_f1b3a055_like ON public.cities_continent USING btree (code varchar_pattern_ops);


--
-- Name: cities_continent_name_e129cef3; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_continent_name_e129cef3 ON public.cities_continent USING btree (name);


--
-- Name: cities_continent_name_e129cef3_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_continent_name_e129cef3_like ON public.cities_continent USING btree (name varchar_pattern_ops);


--
-- Name: cities_country_alt_names_alternativename_id_fc841841; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_alt_names_alternativename_id_fc841841 ON public.cities_country_alt_names USING btree (alternativename_id);


--
-- Name: cities_country_alt_names_country_id_6ee3afe4; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_alt_names_country_id_6ee3afe4 ON public.cities_country_alt_names USING btree (country_id);


--
-- Name: cities_country_code3_0e11830f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_code3_0e11830f_like ON public.cities_country USING btree (code3 varchar_pattern_ops);


--
-- Name: cities_country_code_449cca50_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_code_449cca50_like ON public.cities_country USING btree (code varchar_pattern_ops);


--
-- Name: cities_country_continent_id_94626ba7; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_continent_id_94626ba7 ON public.cities_country USING btree (continent_id);


--
-- Name: cities_country_name_a295b4f9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_name_a295b4f9 ON public.cities_country USING btree (name);


--
-- Name: cities_country_name_a295b4f9_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_name_a295b4f9_like ON public.cities_country USING btree (name varchar_pattern_ops);


--
-- Name: cities_country_neighbours_from_country_id_0808726a; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_neighbours_from_country_id_0808726a ON public.cities_country_neighbours USING btree (from_country_id);


--
-- Name: cities_country_neighbours_to_country_id_684b8319; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_country_neighbours_to_country_id_684b8319 ON public.cities_country_neighbours USING btree (to_country_id);


--
-- Name: cities_district_alt_names_alternativename_id_6cec3f40; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_alt_names_alternativename_id_6cec3f40 ON public.cities_district_alt_names USING btree (alternativename_id);


--
-- Name: cities_district_alt_names_district_id_0dfcbf04; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_alt_names_district_id_0dfcbf04 ON public.cities_district_alt_names USING btree (district_id);


--
-- Name: cities_district_city_id_545850e9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_city_id_545850e9 ON public.cities_district USING btree (city_id);


--
-- Name: cities_district_code_eb713007; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_code_eb713007 ON public.cities_district USING btree (code);


--
-- Name: cities_district_code_eb713007_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_code_eb713007_like ON public.cities_district USING btree (code varchar_pattern_ops);


--
-- Name: cities_district_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_location_id ON public.cities_district USING gist (location);


--
-- Name: cities_district_name_084d8bd2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_name_084d8bd2 ON public.cities_district USING btree (name);


--
-- Name: cities_district_name_084d8bd2_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_name_084d8bd2_like ON public.cities_district USING btree (name varchar_pattern_ops);


--
-- Name: cities_district_name_std_10dc8703; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_name_std_10dc8703 ON public.cities_district USING btree (name_std);


--
-- Name: cities_district_name_std_10dc8703_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_district_name_std_10dc8703_like ON public.cities_district USING btree (name_std varchar_pattern_ops);


--
-- Name: cities_postalcode_alt_names_alternativename_id_929fb699; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_alt_names_alternativename_id_929fb699 ON public.cities_postalcode_alt_names USING btree (alternativename_id);


--
-- Name: cities_postalcode_alt_names_postalcode_id_66d4675e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_alt_names_postalcode_id_66d4675e ON public.cities_postalcode_alt_names USING btree (postalcode_id);


--
-- Name: cities_postalcode_city_id_9f057898; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_city_id_9f057898 ON public.cities_postalcode USING btree (city_id);


--
-- Name: cities_postalcode_country_id_1e5acc4d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_country_id_1e5acc4d ON public.cities_postalcode USING btree (country_id);


--
-- Name: cities_postalcode_district_id_29da640a; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_district_id_29da640a ON public.cities_postalcode USING btree (district_id);


--
-- Name: cities_postalcode_district_name_d6eeded5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_district_name_d6eeded5 ON public.cities_postalcode USING btree (district_name);


--
-- Name: cities_postalcode_district_name_d6eeded5_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_district_name_d6eeded5_like ON public.cities_postalcode USING btree (district_name varchar_pattern_ops);


--
-- Name: cities_postalcode_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_location_id ON public.cities_postalcode USING gist (location);


--
-- Name: cities_postalcode_name_1a542798; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_name_1a542798 ON public.cities_postalcode USING btree (name);


--
-- Name: cities_postalcode_name_1a542798_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_name_1a542798_like ON public.cities_postalcode USING btree (name varchar_pattern_ops);


--
-- Name: cities_postalcode_region_id_7af3abf0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_region_id_7af3abf0 ON public.cities_postalcode USING btree (region_id);


--
-- Name: cities_postalcode_region_name_677e0441; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_region_name_677e0441 ON public.cities_postalcode USING btree (region_name);


--
-- Name: cities_postalcode_region_name_677e0441_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_region_name_677e0441_like ON public.cities_postalcode USING btree (region_name varchar_pattern_ops);


--
-- Name: cities_postalcode_subregion_id_e2b13648; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_subregion_id_e2b13648 ON public.cities_postalcode USING btree (subregion_id);


--
-- Name: cities_postalcode_subregion_name_55d2af20; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_subregion_name_55d2af20 ON public.cities_postalcode USING btree (subregion_name);


--
-- Name: cities_postalcode_subregion_name_55d2af20_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_postalcode_subregion_name_55d2af20_like ON public.cities_postalcode USING btree (subregion_name varchar_pattern_ops);


--
-- Name: cities_region_alt_names_alternativename_id_8e440996; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_alt_names_alternativename_id_8e440996 ON public.cities_region_alt_names USING btree (alternativename_id);


--
-- Name: cities_region_alt_names_region_id_131ea050; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_alt_names_region_id_131ea050 ON public.cities_region_alt_names USING btree (region_id);


--
-- Name: cities_region_code_40a25b6c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_code_40a25b6c ON public.cities_region USING btree (code);


--
-- Name: cities_region_code_40a25b6c_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_code_40a25b6c_like ON public.cities_region USING btree (code varchar_pattern_ops);


--
-- Name: cities_region_country_id_4b6d1b37; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_country_id_4b6d1b37 ON public.cities_region USING btree (country_id);


--
-- Name: cities_region_name_114d6eac; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_name_114d6eac ON public.cities_region USING btree (name);


--
-- Name: cities_region_name_114d6eac_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_name_114d6eac_like ON public.cities_region USING btree (name varchar_pattern_ops);


--
-- Name: cities_region_name_std_3697226c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_name_std_3697226c ON public.cities_region USING btree (name_std);


--
-- Name: cities_region_name_std_3697226c_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_region_name_std_3697226c_like ON public.cities_region USING btree (name_std varchar_pattern_ops);


--
-- Name: cities_subregion_alt_names_alternativename_id_da65ad22; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_alt_names_alternativename_id_da65ad22 ON public.cities_subregion_alt_names USING btree (alternativename_id);


--
-- Name: cities_subregion_alt_names_subregion_id_8748e02e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_alt_names_subregion_id_8748e02e ON public.cities_subregion_alt_names USING btree (subregion_id);


--
-- Name: cities_subregion_code_2e15902b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_code_2e15902b ON public.cities_subregion USING btree (code);


--
-- Name: cities_subregion_code_2e15902b_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_code_2e15902b_like ON public.cities_subregion USING btree (code varchar_pattern_ops);


--
-- Name: cities_subregion_name_ed53afaf; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_name_ed53afaf ON public.cities_subregion USING btree (name);


--
-- Name: cities_subregion_name_ed53afaf_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_name_ed53afaf_like ON public.cities_subregion USING btree (name varchar_pattern_ops);


--
-- Name: cities_subregion_name_std_3785a053; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_name_std_3785a053 ON public.cities_subregion USING btree (name_std);


--
-- Name: cities_subregion_name_std_3785a053_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_name_std_3785a053_like ON public.cities_subregion USING btree (name_std varchar_pattern_ops);


--
-- Name: cities_subregion_region_id_891f4c33; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cities_subregion_region_id_891f4c33 ON public.cities_subregion USING btree (region_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_flatpage_sites_flatpage_id_078bbc8b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_flatpage_sites_flatpage_id_078bbc8b ON public.django_flatpage_sites USING btree (flatpage_id);


--
-- Name: django_flatpage_sites_site_id_bfd8ea84; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_flatpage_sites_site_id_bfd8ea84 ON public.django_flatpage_sites USING btree (site_id);


--
-- Name: django_flatpage_url_41612362; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_flatpage_url_41612362 ON public.django_flatpage USING btree (url);


--
-- Name: django_flatpage_url_41612362_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_flatpage_url_41612362_like ON public.django_flatpage USING btree (url varchar_pattern_ops);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: easy_thumbnails_source_name_5fe0edc6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_source_name_5fe0edc6 ON public.easy_thumbnails_source USING btree (name);


--
-- Name: easy_thumbnails_source_name_5fe0edc6_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_source_name_5fe0edc6_like ON public.easy_thumbnails_source USING btree (name varchar_pattern_ops);


--
-- Name: easy_thumbnails_source_storage_hash_946cbcc9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_source_storage_hash_946cbcc9 ON public.easy_thumbnails_source USING btree (storage_hash);


--
-- Name: easy_thumbnails_source_storage_hash_946cbcc9_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_source_storage_hash_946cbcc9_like ON public.easy_thumbnails_source USING btree (storage_hash varchar_pattern_ops);


--
-- Name: easy_thumbnails_thumbnail_name_b5882c31; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_thumbnail_name_b5882c31 ON public.easy_thumbnails_thumbnail USING btree (name);


--
-- Name: easy_thumbnails_thumbnail_name_b5882c31_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_thumbnail_name_b5882c31_like ON public.easy_thumbnails_thumbnail USING btree (name varchar_pattern_ops);


--
-- Name: easy_thumbnails_thumbnail_source_id_5b57bc77; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_thumbnail_source_id_5b57bc77 ON public.easy_thumbnails_thumbnail USING btree (source_id);


--
-- Name: easy_thumbnails_thumbnail_storage_hash_f1435f49; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_thumbnail_storage_hash_f1435f49 ON public.easy_thumbnails_thumbnail USING btree (storage_hash);


--
-- Name: easy_thumbnails_thumbnail_storage_hash_f1435f49_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX easy_thumbnails_thumbnail_storage_hash_f1435f49_like ON public.easy_thumbnails_thumbnail USING btree (storage_hash varchar_pattern_ops);


--
-- Name: essentials_dataprivacysetting_content_type_id_1a5c1771; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX essentials_dataprivacysetting_content_type_id_1a5c1771 ON public.essentials_dataprivacysetting USING btree (content_type_id);


--
-- Name: essentials_notification_user_id_1b386e75; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX essentials_notification_user_id_1b386e75 ON public.essentials_notification USING btree (user_id);


--
-- Name: essentials_policy_version_50dcf470_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX essentials_policy_version_50dcf470_like ON public.essentials_policy USING btree (version varchar_pattern_ops);


--
-- Name: home_owner_homeownerprofil_homeownerprofile_id_381657c9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_owner_homeownerprofil_homeownerprofile_id_381657c9 ON public.home_owner_homeownerprofile_shortlist USING btree (homeownerprofile_id);


--
-- Name: home_owner_homeownerprofil_housepreference_id_c590b0ea; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_owner_homeownerprofil_housepreference_id_c590b0ea ON public.home_owner_homeownerprofile_shortlist USING btree (housepreference_id);


--
-- Name: house_application_fee_id_eb0a8d55; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_application_fee_id_eb0a8d55 ON public.house_application USING btree (fee_id);


--
-- Name: house_application_house_id_fc78c17e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_application_house_id_fc78c17e ON public.house_application USING btree (house_id);


--
-- Name: house_application_tenant_id_f315186c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_application_tenant_id_f315186c ON public.house_application USING btree (tenant_id);


--
-- Name: house_applicationstate_actor_id_882efe34; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_applicationstate_actor_id_882efe34 ON public.house_applicationstate USING btree (actor_id);


--
-- Name: house_availability_house_id_68ac8ec7; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_availability_house_id_68ac8ec7 ON public.house_availability USING btree (house_id);


--
-- Name: house_cancellationpolicy_official_policy_id_a0742f9d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_cancellationpolicy_official_policy_id_a0742f9d ON public.house_cancellationpolicy USING btree (official_policy_id);


--
-- Name: house_house_cancellation_policy_id_e4dfa638; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_cancellation_policy_id_e4dfa638 ON public.house_house USING btree (cancellation_policy_id);


--
-- Name: house_house_facilities_facility_id_04b424bb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_facilities_facility_id_04b424bb ON public.house_house_facilities USING btree (facility_id);


--
-- Name: house_house_facilities_house_id_7d3581c4; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_facilities_house_id_7d3581c4 ON public.house_house_facilities USING btree (house_id);


--
-- Name: house_house_home_owner_id_e80d9600; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_home_owner_id_e80d9600 ON public.house_house USING btree (home_owner_id);


--
-- Name: house_house_home_type_id_c299d956; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_home_type_id_c299d956 ON public.house_house USING btree (home_type_id);


--
-- Name: house_house_location_id_3c6c5a40; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_location_id_3c6c5a40 ON public.house_house USING btree (location_id);


--
-- Name: house_house_neighbourhood__neighbourhooddescriptor_id_30c3a2b9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_neighbourhood__neighbourhooddescriptor_id_30c3a2b9 ON public.house_house_neighbourhood_facilities USING btree (neighbourhooddescriptor_id);


--
-- Name: house_house_neighbourhood_facilities_house_id_0720a01c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_neighbourhood_facilities_house_id_0720a01c ON public.house_house_neighbourhood_facilities USING btree (house_id);


--
-- Name: house_house_welcome_tags_house_id_74f110d3; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_welcome_tags_house_id_74f110d3 ON public.house_house_welcome_tags USING btree (house_id);


--
-- Name: house_house_welcome_tags_welcometag_id_d521314d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_house_welcome_tags_welcometag_id_d521314d ON public.house_house_welcome_tags USING btree (welcometag_id);


--
-- Name: house_houserule_house_id_c65899f0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_houserule_house_id_c65899f0 ON public.house_houserule USING btree (house_id);


--
-- Name: house_houserule_rule_id_3ccf712c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_houserule_rule_id_3ccf712c ON public.house_houserule USING btree (rule_id);


--
-- Name: house_image_house_id_3d0b078c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX house_image_house_id_3d0b078c ON public.house_image USING btree (house_id);


--
-- Name: messaging_message_thread_id_f689027f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_message_thread_id_f689027f ON public.messaging_message USING btree (thread_id);


--
-- Name: messaging_thread_content_type_id_2e9dab60; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_thread_content_type_id_2e9dab60 ON public.messaging_thread USING btree (content_type_id);


--
-- Name: messaging_thread_creator_id_43315f9b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_thread_creator_id_43315f9b ON public.messaging_thread USING btree (creator_id);


--
-- Name: messaging_threaduser_thread_id_cf4072bb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_threaduser_thread_id_cf4072bb ON public.messaging_threaduser USING btree (thread_id);


--
-- Name: messaging_threaduser_user_id_8bf97f71; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_threaduser_user_id_8bf97f71 ON public.messaging_threaduser USING btree (user_id);


--
-- Name: messaging_threadusermessage_message_id_dd5a70f0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_threadusermessage_message_id_dd5a70f0 ON public.messaging_threadusermessage USING btree (message_id);


--
-- Name: messaging_threadusermessage_user_id_019cdbc9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messaging_threadusermessage_user_id_019cdbc9 ON public.messaging_threadusermessage USING btree (user_id);


--
-- Name: socialaccount_socialaccount_user_id_8146e70c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX socialaccount_socialaccount_user_id_8146e70c ON public.socialaccount_socialaccount USING btree (user_id);


--
-- Name: socialaccount_socialapp_sites_site_id_2579dee5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX socialaccount_socialapp_sites_site_id_2579dee5 ON public.socialaccount_socialapp_sites USING btree (site_id);


--
-- Name: socialaccount_socialapp_sites_socialapp_id_97fb6e7d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX socialaccount_socialapp_sites_socialapp_id_97fb6e7d ON public.socialaccount_socialapp_sites USING btree (socialapp_id);


--
-- Name: socialaccount_socialtoken_account_id_951f210e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX socialaccount_socialtoken_account_id_951f210e ON public.socialaccount_socialtoken USING btree (account_id);


--
-- Name: socialaccount_socialtoken_app_id_636a42d7; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX socialaccount_socialtoken_app_id_636a42d7 ON public.socialaccount_socialtoken USING btree (app_id);


--
-- Name: tenant_additionaltenant_house_pref_id_ee516cad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_additionaltenant_house_pref_id_ee516cad ON public.tenant_additionaltenant USING btree (house_pref_id);


--
-- Name: tenant_housepreference_home_type_id_0f67cebe; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_housepreference_home_type_id_0f67cebe ON public.tenant_housepreference USING btree (home_type_id);


--
-- Name: tenant_housepreference_locations_city_id_4c61e36c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_housepreference_locations_city_id_4c61e36c ON public.tenant_housepreference_locations USING btree (city_id);


--
-- Name: tenant_housepreference_locations_housepreference_id_a4885518; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_housepreference_locations_housepreference_id_a4885518 ON public.tenant_housepreference_locations USING btree (housepreference_id);


--
-- Name: tenant_housepreference_tenant_id_0869a8b5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_housepreference_tenant_id_0869a8b5 ON public.tenant_housepreference USING btree (tenant_id);


--
-- Name: tenant_tenantprofile_shortlist_house_id_eb8c571e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_tenantprofile_shortlist_house_id_eb8c571e ON public.tenant_tenantprofile_shortlist USING btree (house_id);


--
-- Name: tenant_tenantprofile_shortlist_tenantprofile_id_3308dbd5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenant_tenantprofile_shortlist_tenantprofile_id_3308dbd5 ON public.tenant_tenantprofile_shortlist USING btree (tenantprofile_id);


--
-- Name: user_custom_user_email_68ecbbcf_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_user_email_68ecbbcf_like ON public.user_custom_user USING btree (email varchar_pattern_ops);


--
-- Name: user_custom_user_groups_group_id_d0c8b13f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_user_groups_group_id_d0c8b13f ON public.user_custom_user_groups USING btree (group_id);


--
-- Name: user_custom_user_groups_user_id_551047d6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_user_groups_user_id_551047d6 ON public.user_custom_user_groups USING btree (user_id);


--
-- Name: user_custom_user_user_permissions_permission_id_3377f96f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_user_user_permissions_permission_id_3377f96f ON public.user_custom_user_user_permissions USING btree (permission_id);


--
-- Name: user_custom_user_user_permissions_user_id_52e5d58b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_user_user_permissions_user_id_52e5d58b ON public.user_custom_user_user_permissions USING btree (user_id);


--
-- Name: user_custom_userprofile_pe_personalitytag_id_358b9caa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_userprofile_pe_personalitytag_id_358b9caa ON public.user_custom_userprofile_personality_tags USING btree (personalitytag_id);


--
-- Name: user_custom_userprofile_pe_userprofile_id_fb5ad98b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_custom_userprofile_pe_userprofile_id_fb5ad98b ON public.user_custom_userprofile_personality_tags USING btree (userprofile_id);


--
-- Name: account_emailaddress account_emailaddress_user_id_2c513194_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_user_id_2c513194_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_emailconfirmation account_emailconfirmation_email_address_id_5b7f8c58_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_email_address_id_5b7f8c58_fk FOREIGN KEY (email_address_id) REFERENCES public.account_emailaddress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: admin_custom_activitylog admin_custom_activit_actor_id_3326fe58_fk_user_cust; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_custom_activitylog
    ADD CONSTRAINT admin_custom_activit_actor_id_3326fe58_fk_user_cust FOREIGN KEY (actor_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: admin_custom_activitylog admin_custom_activit_content_type_id_dd53992c_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_custom_activitylog
    ADD CONSTRAINT admin_custom_activit_content_type_id_dd53992c_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: billing_order billing_order_application_id_b1188680_fk_house_application_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_order
    ADD CONSTRAINT billing_order_application_id_b1188680_fk_house_application_id FOREIGN KEY (application_id) REFERENCES public.house_application(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_city_alt_names cities_city_alt_name_alternativename_id_350db157_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city_alt_names
    ADD CONSTRAINT cities_city_alt_name_alternativename_id_350db157_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_city_alt_names cities_city_alt_names_city_id_fa972594_fk_cities_city_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city_alt_names
    ADD CONSTRAINT cities_city_alt_names_city_id_fa972594_fk_cities_city_id FOREIGN KEY (city_id) REFERENCES public.cities_city(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_city cities_city_country_id_779ae117_fk_cities_country_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city
    ADD CONSTRAINT cities_city_country_id_779ae117_fk_cities_country_id FOREIGN KEY (country_id) REFERENCES public.cities_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_city cities_city_region_id_0227cdac_fk_cities_region_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city
    ADD CONSTRAINT cities_city_region_id_0227cdac_fk_cities_region_id FOREIGN KEY (region_id) REFERENCES public.cities_region(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_city cities_city_subregion_id_9fbab97d_fk_cities_subregion_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_city
    ADD CONSTRAINT cities_city_subregion_id_9fbab97d_fk_cities_subregion_id FOREIGN KEY (subregion_id) REFERENCES public.cities_subregion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_continent_alt_names cities_continent_alt_alternativename_id_711487a6_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent_alt_names
    ADD CONSTRAINT cities_continent_alt_alternativename_id_711487a6_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_continent_alt_names cities_continent_alt_continent_id_b77e7789_fk_cities_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_continent_alt_names
    ADD CONSTRAINT cities_continent_alt_continent_id_b77e7789_fk_cities_co FOREIGN KEY (continent_id) REFERENCES public.cities_continent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_country_alt_names cities_country_alt_n_alternativename_id_fc841841_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_alt_names
    ADD CONSTRAINT cities_country_alt_n_alternativename_id_fc841841_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_country_alt_names cities_country_alt_n_country_id_6ee3afe4_fk_cities_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_alt_names
    ADD CONSTRAINT cities_country_alt_n_country_id_6ee3afe4_fk_cities_co FOREIGN KEY (country_id) REFERENCES public.cities_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_country cities_country_continent_id_94626ba7_fk_cities_continent_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country
    ADD CONSTRAINT cities_country_continent_id_94626ba7_fk_cities_continent_id FOREIGN KEY (continent_id) REFERENCES public.cities_continent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_country_neighbours cities_country_neigh_from_country_id_0808726a_fk_cities_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_neighbours
    ADD CONSTRAINT cities_country_neigh_from_country_id_0808726a_fk_cities_co FOREIGN KEY (from_country_id) REFERENCES public.cities_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_country_neighbours cities_country_neigh_to_country_id_684b8319_fk_cities_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_country_neighbours
    ADD CONSTRAINT cities_country_neigh_to_country_id_684b8319_fk_cities_co FOREIGN KEY (to_country_id) REFERENCES public.cities_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_district_alt_names cities_district_alt__alternativename_id_6cec3f40_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district_alt_names
    ADD CONSTRAINT cities_district_alt__alternativename_id_6cec3f40_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_district_alt_names cities_district_alt__district_id_0dfcbf04_fk_cities_di; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district_alt_names
    ADD CONSTRAINT cities_district_alt__district_id_0dfcbf04_fk_cities_di FOREIGN KEY (district_id) REFERENCES public.cities_district(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_district cities_district_city_id_545850e9_fk_cities_city_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_district
    ADD CONSTRAINT cities_district_city_id_545850e9_fk_cities_city_id FOREIGN KEY (city_id) REFERENCES public.cities_city(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode_alt_names cities_postalcode_al_alternativename_id_929fb699_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode_alt_names
    ADD CONSTRAINT cities_postalcode_al_alternativename_id_929fb699_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode_alt_names cities_postalcode_al_postalcode_id_66d4675e_fk_cities_po; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode_alt_names
    ADD CONSTRAINT cities_postalcode_al_postalcode_id_66d4675e_fk_cities_po FOREIGN KEY (postalcode_id) REFERENCES public.cities_postalcode(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode cities_postalcode_city_id_9f057898_fk_cities_city_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_city_id_9f057898_fk_cities_city_id FOREIGN KEY (city_id) REFERENCES public.cities_city(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode cities_postalcode_country_id_1e5acc4d_fk_cities_country_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_country_id_1e5acc4d_fk_cities_country_id FOREIGN KEY (country_id) REFERENCES public.cities_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode cities_postalcode_district_id_29da640a_fk_cities_district_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_district_id_29da640a_fk_cities_district_id FOREIGN KEY (district_id) REFERENCES public.cities_district(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode cities_postalcode_region_id_7af3abf0_fk_cities_region_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_region_id_7af3abf0_fk_cities_region_id FOREIGN KEY (region_id) REFERENCES public.cities_region(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_postalcode cities_postalcode_subregion_id_e2b13648_fk_cities_subregion_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_postalcode
    ADD CONSTRAINT cities_postalcode_subregion_id_e2b13648_fk_cities_subregion_id FOREIGN KEY (subregion_id) REFERENCES public.cities_subregion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_region_alt_names cities_region_alt_na_alternativename_id_8e440996_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region_alt_names
    ADD CONSTRAINT cities_region_alt_na_alternativename_id_8e440996_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_region_alt_names cities_region_alt_names_region_id_131ea050_fk_cities_region_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region_alt_names
    ADD CONSTRAINT cities_region_alt_names_region_id_131ea050_fk_cities_region_id FOREIGN KEY (region_id) REFERENCES public.cities_region(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_region cities_region_country_id_4b6d1b37_fk_cities_country_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_region
    ADD CONSTRAINT cities_region_country_id_4b6d1b37_fk_cities_country_id FOREIGN KEY (country_id) REFERENCES public.cities_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_subregion_alt_names cities_subregion_alt_alternativename_id_da65ad22_fk_cities_al; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion_alt_names
    ADD CONSTRAINT cities_subregion_alt_alternativename_id_da65ad22_fk_cities_al FOREIGN KEY (alternativename_id) REFERENCES public.cities_alternativename(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_subregion_alt_names cities_subregion_alt_subregion_id_8748e02e_fk_cities_su; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion_alt_names
    ADD CONSTRAINT cities_subregion_alt_subregion_id_8748e02e_fk_cities_su FOREIGN KEY (subregion_id) REFERENCES public.cities_subregion(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cities_subregion cities_subregion_region_id_891f4c33_fk_cities_region_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities_subregion
    ADD CONSTRAINT cities_subregion_region_id_891f4c33_fk_cities_region_id FOREIGN KEY (region_id) REFERENCES public.cities_region(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_flatpage_sites django_flatpage_site_flatpage_id_078bbc8b_fk_django_fl; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage_sites
    ADD CONSTRAINT django_flatpage_site_flatpage_id_078bbc8b_fk_django_fl FOREIGN KEY (flatpage_id) REFERENCES public.django_flatpage(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_flatpage_sites django_flatpage_sites_site_id_bfd8ea84_fk_django_site_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.django_flatpage_sites
    ADD CONSTRAINT django_flatpage_sites_site_id_bfd8ea84_fk_django_site_id FOREIGN KEY (site_id) REFERENCES public.django_site(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easy_thumbnails_thumbnail easy_thumbnails_thum_source_id_5b57bc77_fk_easy_thum; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnail
    ADD CONSTRAINT easy_thumbnails_thum_source_id_5b57bc77_fk_easy_thum FOREIGN KEY (source_id) REFERENCES public.easy_thumbnails_source(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easy_thumbnails_thumbnaildimensions easy_thumbnails_thum_thumbnail_id_c3a0c549_fk_easy_thum; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.easy_thumbnails_thumbnaildimensions
    ADD CONSTRAINT easy_thumbnails_thum_thumbnail_id_c3a0c549_fk_easy_thum FOREIGN KEY (thumbnail_id) REFERENCES public.easy_thumbnails_thumbnail(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: essentials_dataprivacysetting essentials_datapriva_content_type_id_1a5c1771_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_dataprivacysetting
    ADD CONSTRAINT essentials_datapriva_content_type_id_1a5c1771_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: essentials_notification essentials_notification_user_id_1b386e75_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_notification
    ADD CONSTRAINT essentials_notification_user_id_1b386e75_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: essentials_policy essentials_policy_parent_policy_id_c23344f6_fk_essential; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.essentials_policy
    ADD CONSTRAINT essentials_policy_parent_policy_id_c23344f6_fk_essential FOREIGN KEY (parent_policy_id) REFERENCES public.essentials_policy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: home_owner_homeownerprofile_shortlist home_owner_homeowner_homeownerprofile_id_381657c9_fk_home_owne; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile_shortlist
    ADD CONSTRAINT home_owner_homeowner_homeownerprofile_id_381657c9_fk_home_owne FOREIGN KEY (homeownerprofile_id) REFERENCES public.home_owner_homeownerprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: home_owner_homeownerprofile_shortlist home_owner_homeowner_housepreference_id_c590b0ea_fk_tenant_ho; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile_shortlist
    ADD CONSTRAINT home_owner_homeowner_housepreference_id_c590b0ea_fk_tenant_ho FOREIGN KEY (housepreference_id) REFERENCES public.tenant_housepreference(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: home_owner_homeownerprofile home_owner_homeowner_user_id_f7d7f2f0_fk_user_cust; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_owner_homeownerprofile
    ADD CONSTRAINT home_owner_homeowner_user_id_f7d7f2f0_fk_user_cust FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_application house_application_fee_id_eb0a8d55_fk_billing_fee_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application
    ADD CONSTRAINT house_application_fee_id_eb0a8d55_fk_billing_fee_id FOREIGN KEY (fee_id) REFERENCES public.billing_fee(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_application house_application_house_id_fc78c17e_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application
    ADD CONSTRAINT house_application_house_id_fc78c17e_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_application house_application_tenant_id_f315186c_fk_tenant_tenantprofile_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_application
    ADD CONSTRAINT house_application_tenant_id_f315186c_fk_tenant_tenantprofile_id FOREIGN KEY (tenant_id) REFERENCES public.tenant_tenantprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_applicationstate house_applicationstate_actor_id_882efe34_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_applicationstate
    ADD CONSTRAINT house_applicationstate_actor_id_882efe34_fk_user_custom_user_id FOREIGN KEY (actor_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_availability house_availability_house_id_68ac8ec7_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_availability
    ADD CONSTRAINT house_availability_house_id_68ac8ec7_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_cancellationpolicy house_cancellationpo_official_policy_id_a0742f9d_fk_essential; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_cancellationpolicy
    ADD CONSTRAINT house_cancellationpo_official_policy_id_a0742f9d_fk_essential FOREIGN KEY (official_policy_id) REFERENCES public.essentials_policy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house house_house_cancellation_policy__e4dfa638_fk_house_can; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house
    ADD CONSTRAINT house_house_cancellation_policy__e4dfa638_fk_house_can FOREIGN KEY (cancellation_policy_id) REFERENCES public.house_cancellationpolicy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house_facilities house_house_faciliti_facility_id_04b424bb_fk_house_fac; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_facilities
    ADD CONSTRAINT house_house_faciliti_facility_id_04b424bb_fk_house_fac FOREIGN KEY (facility_id) REFERENCES public.house_facility(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house_facilities house_house_facilities_house_id_7d3581c4_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_facilities
    ADD CONSTRAINT house_house_facilities_house_id_7d3581c4_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house house_house_home_owner_id_e80d9600_fk_home_owne; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house
    ADD CONSTRAINT house_house_home_owner_id_e80d9600_fk_home_owne FOREIGN KEY (home_owner_id) REFERENCES public.home_owner_homeownerprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house house_house_home_type_id_c299d956_fk_house_hometype_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house
    ADD CONSTRAINT house_house_home_type_id_c299d956_fk_house_hometype_id FOREIGN KEY (home_type_id) REFERENCES public.house_hometype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house house_house_location_id_3c6c5a40_fk_cities_postalcode_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house
    ADD CONSTRAINT house_house_location_id_3c6c5a40_fk_cities_postalcode_id FOREIGN KEY (location_id) REFERENCES public.cities_postalcode(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house_neighbourhood_facilities house_house_neighbou_house_id_0720a01c_fk_house_hou; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_neighbourhood_facilities
    ADD CONSTRAINT house_house_neighbou_house_id_0720a01c_fk_house_hou FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house_neighbourhood_facilities house_house_neighbou_neighbourhooddescrip_30c3a2b9_fk_house_nei; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_neighbourhood_facilities
    ADD CONSTRAINT house_house_neighbou_neighbourhooddescrip_30c3a2b9_fk_house_nei FOREIGN KEY (neighbourhooddescriptor_id) REFERENCES public.house_neighbourhooddescriptor(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house_welcome_tags house_house_welcome__welcometag_id_d521314d_fk_house_wel; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_welcome_tags
    ADD CONSTRAINT house_house_welcome__welcometag_id_d521314d_fk_house_wel FOREIGN KEY (welcometag_id) REFERENCES public.house_welcometag(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_house_welcome_tags house_house_welcome_tags_house_id_74f110d3_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_house_welcome_tags
    ADD CONSTRAINT house_house_welcome_tags_house_id_74f110d3_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_houseprofile house_houseprofile_house_id_ef284166_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houseprofile
    ADD CONSTRAINT house_houseprofile_house_id_ef284166_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_houserule house_houserule_house_id_c65899f0_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houserule
    ADD CONSTRAINT house_houserule_house_id_c65899f0_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_houserule house_houserule_rule_id_3ccf712c_fk_house_rule_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_houserule
    ADD CONSTRAINT house_houserule_rule_id_3ccf712c_fk_house_rule_id FOREIGN KEY (rule_id) REFERENCES public.house_rule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: house_image house_image_house_id_3d0b078c_fk_house_house_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.house_image
    ADD CONSTRAINT house_image_house_id_3d0b078c_fk_house_house_id FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_message messaging_message_thread_id_f689027f_fk_messaging_thread_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_message
    ADD CONSTRAINT messaging_message_thread_id_f689027f_fk_messaging_thread_id FOREIGN KEY (thread_id) REFERENCES public.messaging_thread(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_thread messaging_thread_content_type_id_2e9dab60_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_thread
    ADD CONSTRAINT messaging_thread_content_type_id_2e9dab60_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_thread messaging_thread_creator_id_43315f9b_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_thread
    ADD CONSTRAINT messaging_thread_creator_id_43315f9b_fk_user_custom_user_id FOREIGN KEY (creator_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_threadusermessage messaging_threaduser_message_id_dd5a70f0_fk_messaging; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threadusermessage
    ADD CONSTRAINT messaging_threaduser_message_id_dd5a70f0_fk_messaging FOREIGN KEY (message_id) REFERENCES public.messaging_message(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_threaduser messaging_threaduser_thread_id_cf4072bb_fk_messaging_thread_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threaduser
    ADD CONSTRAINT messaging_threaduser_thread_id_cf4072bb_fk_messaging_thread_id FOREIGN KEY (thread_id) REFERENCES public.messaging_thread(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_threadusermessage messaging_threaduser_user_id_019cdbc9_fk_messaging; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threadusermessage
    ADD CONSTRAINT messaging_threaduser_user_id_019cdbc9_fk_messaging FOREIGN KEY (user_id) REFERENCES public.messaging_threaduser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: messaging_threaduser messaging_threaduser_user_id_8bf97f71_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messaging_threaduser
    ADD CONSTRAINT messaging_threaduser_user_id_8bf97f71_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialtoken socialaccount_social_account_id_951f210e_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_social_account_id_951f210e_fk_socialacc FOREIGN KEY (account_id) REFERENCES public.socialaccount_socialaccount(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialtoken socialaccount_social_app_id_636a42d7_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_social_app_id_636a42d7_fk_socialacc FOREIGN KEY (app_id) REFERENCES public.socialaccount_socialapp(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialapp_sites socialaccount_social_site_id_2579dee5_fk_django_si; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_social_site_id_2579dee5_fk_django_si FOREIGN KEY (site_id) REFERENCES public.django_site(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialapp_sites socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc FOREIGN KEY (socialapp_id) REFERENCES public.socialaccount_socialapp(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialaccount socialaccount_social_user_id_8146e70c_fk_user_cust; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_social_user_id_8146e70c_fk_user_cust FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_additionaltenant tenant_additionalten_house_pref_id_ee516cad_fk_tenant_ho; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_additionaltenant
    ADD CONSTRAINT tenant_additionalten_house_pref_id_ee516cad_fk_tenant_ho FOREIGN KEY (house_pref_id) REFERENCES public.tenant_housepreference(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_housepreference_locations tenant_housepreferen_city_id_4c61e36c_fk_cities_ci; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference_locations
    ADD CONSTRAINT tenant_housepreferen_city_id_4c61e36c_fk_cities_ci FOREIGN KEY (city_id) REFERENCES public.cities_city(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_housepreference tenant_housepreferen_home_type_id_0f67cebe_fk_house_hom; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference
    ADD CONSTRAINT tenant_housepreferen_home_type_id_0f67cebe_fk_house_hom FOREIGN KEY (home_type_id) REFERENCES public.house_hometype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_housepreference_locations tenant_housepreferen_housepreference_id_a4885518_fk_tenant_ho; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference_locations
    ADD CONSTRAINT tenant_housepreferen_housepreference_id_a4885518_fk_tenant_ho FOREIGN KEY (housepreference_id) REFERENCES public.tenant_housepreference(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_housepreference tenant_housepreferen_tenant_id_0869a8b5_fk_tenant_te; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_housepreference
    ADD CONSTRAINT tenant_housepreferen_tenant_id_0869a8b5_fk_tenant_te FOREIGN KEY (tenant_id) REFERENCES public.tenant_tenantprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_tenantprofile_shortlist tenant_tenantprofile_house_id_eb8c571e_fk_house_hou; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile_shortlist
    ADD CONSTRAINT tenant_tenantprofile_house_id_eb8c571e_fk_house_hou FOREIGN KEY (house_id) REFERENCES public.house_house(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_tenantprofile_shortlist tenant_tenantprofile_tenantprofile_id_3308dbd5_fk_tenant_te; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile_shortlist
    ADD CONSTRAINT tenant_tenantprofile_tenantprofile_id_3308dbd5_fk_tenant_te FOREIGN KEY (tenantprofile_id) REFERENCES public.tenant_tenantprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tenant_tenantprofile tenant_tenantprofile_user_id_9ade1089_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_tenantprofile
    ADD CONSTRAINT tenant_tenantprofile_user_id_9ade1089_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_user_groups user_custom_user_groups_group_id_d0c8b13f_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_groups
    ADD CONSTRAINT user_custom_user_groups_group_id_d0c8b13f_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_user_groups user_custom_user_groups_user_id_551047d6_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_groups
    ADD CONSTRAINT user_custom_user_groups_user_id_551047d6_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_user_user_permissions user_custom_user_use_permission_id_3377f96f_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_user_permissions
    ADD CONSTRAINT user_custom_user_use_permission_id_3377f96f_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_user_user_permissions user_custom_user_use_user_id_52e5d58b_fk_user_cust; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_user_user_permissions
    ADD CONSTRAINT user_custom_user_use_user_id_52e5d58b_fk_user_cust FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_userprofile_personality_tags user_custom_userprof_personalitytag_id_358b9caa_fk_user_cust; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile_personality_tags
    ADD CONSTRAINT user_custom_userprof_personalitytag_id_358b9caa_fk_user_cust FOREIGN KEY (personalitytag_id) REFERENCES public.user_custom_personalitytag(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_userprofile_personality_tags user_custom_userprof_userprofile_id_fb5ad98b_fk_user_cust; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile_personality_tags
    ADD CONSTRAINT user_custom_userprof_userprofile_id_fb5ad98b_fk_user_cust FOREIGN KEY (userprofile_id) REFERENCES public.user_custom_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_custom_userprofile user_custom_userprofile_user_id_28d5416e_fk_user_custom_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_custom_userprofile
    ADD CONSTRAINT user_custom_userprofile_user_id_28d5416e_fk_user_custom_user_id FOREIGN KEY (user_id) REFERENCES public.user_custom_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

